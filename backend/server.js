const express = require("express");
const session = require("express-session");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

console.log("🚀 Server is starting...");

// السماح للفرونت إند بالتواصل مع السيرفر
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

console.log("✅ CORS and JSON middleware applied.");

// إعداد الجلسات
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || "super-secret-key",
    resave: false,
    saveUninitialized: false, // عدم إنشاء جلسات فارغة
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // مدة الجلسة يوم واحد
    },
});
app.use(sessionMiddleware);
console.log("✅ Session middleware configured.");

// مشاركة الجلسات مع Socket.IO
io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
});

// إعداد Passport.js لديسكورد
app.use(passport.initialize());
app.use(passport.session());

console.log("✅ Passport initialized.");

// جلسات المستخدم
passport.serializeUser((user, done) => {
    console.log("🔄 Serializing user:", user);
    done(null, { id: user.id, username: user.username, avatar: user.avatar });
});

passport.deserializeUser((obj, done) => {
    console.log("🔄 Deserializing user:", obj);
    done(null, obj);
});

// إعداد OAuth2 لديسكورد
passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: process.env.DISCORD_REDIRECT_URI || "http://localhost:5000/auth/discord/callback",
            scope: ["identify"],
        },
        (accessToken, refreshToken, profile, done) => {
            console.log("✅ User authenticated successfully:", profile);
            return done(null, profile);
        }
    )
);

console.log("✅ Passport Discord strategy configured.");

// مسار تسجيل الدخول بديسكورد
app.get("/auth/discord", (req, res, next) => {
    console.log("🔄 Redirecting to Discord login...");
    next();
}, passport.authenticate("discord"));

// المعالجة بعد نجاح تسجيل الدخول
app.get(
    "/auth/discord/callback",
    passport.authenticate("discord", { failureRedirect: "/" }),
    (req, res) => {
        console.log("👤 Authenticated User:", req.user);
        console.log("📌 Session after authentication:", req.session);
        res.redirect("http://localhost:5173/dashboard");
    }
);

// التحقق من تسجيل الدخول وإرجاع بيانات المستخدم
app.get("/auth/status", (req, res) => {
    console.log("📌 Checking authentication status...");
    console.log("🔎 Session data:", req.session);

    if (req.isAuthenticated()) {
        console.log("✅ User is authenticated:", req.user);
        res.json(req.user);
    } else {
        console.log("❌ User not authenticated");
        res.status(401).json({ message: "Not authenticated" });
    }
});

app.get("/auth/logout", (req, res) => {
    console.log("🚪 Logging out user:", req.user);

    req.session.destroy((err) => {
        if (err) {
            console.error("❌ Error destroying session:", err);
            return res.status(500).json({ message: "Error logging out" });
        }
        console.log("✅ Session destroyed.");
        res.json({ message: "Logged out successfully" });
    });
});

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}/`);
});
