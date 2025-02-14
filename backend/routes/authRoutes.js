const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/discord", passport.authenticate("discord"));

router.get(
  "/discord/callback",
  passport.authenticate("discord", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard"); // تحويل المستخدم بعد تسجيل الدخول
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {});
  res.redirect("/");
});

module.exports = router;
