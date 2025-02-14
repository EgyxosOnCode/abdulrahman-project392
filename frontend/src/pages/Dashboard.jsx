import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { 
  FaVolumeMute, 
  FaBan, 
  FaTicketAlt, 
  FaWallet, 
  FaStar, 
  FaSignOutAlt, 
  FaChartBar, 
  FaChevronRight, 
  FaChevronDown, 
  FaUsers, 
  FaCogs, 
  FaUserShield, 
  FaAngleRight,
  FaDiscord 
} from "react-icons/fa";
import { MdDisplaySettings } from "react-icons/md";
import { PiHandbagSimpleFill } from "react-icons/pi";
import { GiNotebook } from "react-icons/gi";
import { MdOutlineContactPhone } from "react-icons/md";
import { FaMoneyBills } from "react-icons/fa6";
import { SlNote } from "react-icons/sl";
import { MdDashboard } from "react-icons/md";
import axios from "axios";
import "./Dashboard.css";
import Meetings from "./Meetings";

const defaultUser = {
  username: "Guest",
  avatar: "https://i.imgur.com/6VBx3io.png",
  role: "Moderator",
  muteCount: 4,
  banCount: 1,
  ticketsClaimed: 9,
};

const activityData = [
  { day: "Mon", activity: 2 },
  { day: "Tue", activity: 4 },
  { day: "Wed", activity: 1 },
  { day: "Thu", activity: 5 },
  { day: "Fri", activity: 4 },
  { day: "Sat", activity: 7 },
  { day: "Sun", activity: 3 },
];

const handleLogout = async () => {
    try {
        console.log("🚀 Attempting to log out...");
        const response = await axios.get("http://localhost:5000/auth/logout", {
            withCredentials: true, // السماح بإرسال الكوكيز
        });

        if (response.status === 200) {
            console.log("✅ Logout successful! Redirecting...");
            window.location.href = "http://localhost:5173/"; // توجيه المستخدم بعد النجاح
        } else {
            console.error("❌ Unexpected response:", response);
        }
    } catch (error) {
        console.error("❌ Failed to logout:", error);
    }
};


const Statistics = ({ user }) => (
  <>
    <h1 className="title">Statistics</h1>
    <div className="cards-grid">
      <div className="stat-card">
        <FaVolumeMute className="card-icon" />
        <p>Mute Count</p>
        <h2>{user.muteCount}</h2>
        <div className="icon-bg">
          <FaVolumeMute />
        </div>
      </div>
      <div className="stat-card">
        <FaBan className="card-icon" />
        <p>Ban Count</p>
        <h2>{user.banCount}</h2>
        <div className="icon-bg">
          <FaBan />
        </div>
      </div>
      <div className="stat-card">
        <FaTicketAlt className="card-icon" />
        <p>Tickets Claimed</p>
        <h2>{user.ticketsClaimed}</h2>
        <div className="icon-bg">
          <FaTicketAlt />
        </div>
      </div>
    </div>
    <div className="chart-box">
      <h2 className="chart-title">Admin Activity Analysis</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activityData}>
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
            <Line type="monotone" dataKey="activity" stroke="#9a3f4c" strokeWidth={2} dot={{ fill: "#fff" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </>
);

const Target = () => (
  <div>
    <h1 className="title">Target</h1>
    <p>Content for the Target page...</p>
  </div>
);

const Wallet = () => (
  <div>
    <h1 className="title">Wallet</h1>
    <p>Content for the Wallet page...</p>
  </div>
);

const Bills = () => (
  <div>
    <h1 className="title">Bills</h1>
    <p>Content for the Bills page...</p>
  </div>
);

const Terms = () => (
    <div>
      <h1 className="title">Terms And Conditions</h1>
      <div className="terms-content">
  
        <h3>Prohibition of Spam and Negative Behavior</h3>
        <p>
          It is strictly prohibited to spread chaos or engage in provocative behavior within the server.
          Any attempt to instigate problems or act in a toxic manner will result in immediate accountability.
        </p>
  
        <h3>Strict Adherence to Complete Neutrality</h3>
        <p>
          Administrators must avoid discussing sensitive topics such as politics, racism, or hate.
          Any behavior that fosters divisions or conflicts is strictly forbidden.
        </p>
  
        <h3>Administrative Engagement</h3>
        <p>
          Administrators are required to be regularly present to monitor the server and intervene when necessary.
          Penalties (such as bans or mutes) must be executed immediately when needed.
        </p>
  
        <h3>Providing Evidence for Disciplinary Actions</h3>
        <p>
          Clear evidence must be maintained to justify any disciplinary action.
          Such evidence should be submitted within one hour of the enforcement of the penalty.
        </p>
  
        <h3>Mutual Respect</h3>
        <p>
          All interactions must be conducted in a respectful manner, regardless of whether the counterpart is an administrator or a player.
          Abusive language or inappropriate behavior is strictly prohibited.
          In case of any misunderstanding or conflict, administrators must immediately contact the appropriate supervisory authority.
        </p>
  
        <h3>No Abuse of Administrative Privileges</h3>
        <p>
          The use of administrative privileges must be justified and appropriate to the situation.
          Any misuse or abuse of these privileges will result in the immediate revocation of the rank.
        </p>
  
        <h3>Immediate Reporting of Issues</h3>
        <p>
          Any server issues or administrative errors must be reported immediately to the senior administration.
          Do not attempt to resolve such issues independently without informing the responsible authorities.
        </p>
  
        <h3>Maintaining Confidentiality</h3>
        <p>
          Disclosing any information related to administration or internal discussions to external parties is strictly prohibited.
          Violators will face immediate revocation of their rank.
          Maintaining confidentiality is a fundamental duty for all administrators.
        </p>
  
        <h3>No Bias (Favoritism)</h3>
        <p>
          All players must be treated equally without any form of discrimination or favoritism.
          In the event that bias is proven, the relevant procedures will be reviewed and the responsible party will be held accountable.
        </p>
  
        <h3>General Notes</h3>
        <p>
          Adherence to these policies ensures a professional and enjoyable environment for everyone.
          Any violation may result in accountability and potentially lead to the loss of administrative privileges.
        </p>
  
        <h3>Supplementary Policies</h3>
        <p>
          These policies are subject to periodic updates. All administrators are required to review and adhere to the most recent version
          to maintain a smooth and professional management environment.
        </p>
      </div>
    </div>
  );

const Contact = () => (
  <div>
    <h1 className="title">Contact</h1>
    <p>Content for the Contact page...</p>
  </div>
);

const DiscordPage = () => (
  <div>
    <h1 className="title">Discord</h1>
    <p>Content for the Discord page...</p>
  </div>
);

const DashboardHome = () => (
  <div>
    <h1 className="title">Dashboard Home</h1>
    <p>Welcome to the Dashboard Home Page...</p>
  </div>
);

const Settings = () => (
  <div>
    <h1 className="title">Settings</h1>
    <p>Content for the Settings page...</p>
  </div>
);

const Dashboard = () => {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // دالة جلب بيانات المستخدم
  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/status", { withCredentials: true });
      const userData = response.data;
      const avatarUrl = userData.avatar
        ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
        : defaultUser.avatar;
    
      setUser({
        username: userData.username || defaultUser.username,
        avatar: avatarUrl,
        role: userData.role || defaultUser.role,
        muteCount: userData.muteCount || defaultUser.muteCount,
        banCount: userData.banCount || defaultUser.banCount,
        ticketsClaimed: userData.ticketsClaimed || defaultUser.ticketsClaimed,
      });
    
    } catch (err) {
      console.error("❌ Failed to fetch user data:", err.response ? err.response.data : err.message);
    
      // إعادة تعيين بيانات المستخدم إلى القيم الافتراضية
      setUser(defaultUser);
    
      // تحديث حالة الخطأ برسالة واضحة للمستخدم
      setError(
        <div className="error-container">
          <p className="error-message">
          ❌ Oops! It looks like you forgot something. You need to log in first to view this content.
          </p>
          {/* هذا هو الزرررر */}
          <button 
            className="discord-login-btn"
            onClick={() => window.location.href = "http://localhost:5000/auth/discord"}
          >
            <FaDiscord /> Login with Discord
          </button>
        </div>
      );
    
    } finally {
      setLoading(false);
    }
    
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // دالة تبديل ظهور القائمة المنسدلة مع منع انتشار الحدث
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  // إغلاق القائمة عند النقر خارج صندوق الملف الشخصي
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-profile-box')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
      <div className="logo-section">
      <img src="/logo.png" alt="WildMc Logo" className="logo" />
      <div className="logo-text-container">
        <h2 className="logo-text">WildMc</h2>
        <p className="logo-subtext">Backstage</p>
        </div>
      </div>

        {/* صندوق الملف الشخصي مع القائمة المنسدلة */}
        <div className="user-profile-box" onClick={toggleDropdown}>
          <img src={user.avatar} alt="User Avatar" />
          <div className="user-profile-info">
            <div className="user-name">{user.username}</div>
            <div className="user-role">{user.role}</div>
          </div>
          <div className="dropdown-icon">
            {dropdownOpen ? <FaChevronDown /> : <FaChevronRight />}
          </div>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                className="dropdown-menu"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="dropdown-section">
                  <div className="dropdown-header">
                    <FaUsers className="dropdown-header-icon" />
                    <span className="dropdown-title">Community</span>
                  </div>
                  <ul>
                    <li className="dropdownNormalTitle" onClick={() => { navigate("/dashboard/terms"); setDropdownOpen(false); }}>
                      <SlNote className="menu-icon" />
                      <span>Terms And Conditions</span>
                    </li>
                    <li className="dropdownNormalTitle" onClick={() => { navigate("/dashboard/contact"); setDropdownOpen(false); }}>
                      <MdOutlineContactPhone className="menu-icon" />
                      <span>Contact</span>
                    </li>
                    <li className="discord3i" onClick={() => { navigate("/dashboard/discord"); setDropdownOpen(false); }}>
                      <FaDiscord className="menu-icon" />
                      <span>Discord</span>
                    </li>
                  </ul>
                </div>
                <div className="dropdown-section">
                  <div className="dropdown-header">
                    <MdDisplaySettings className="dropdown-header-icon" id="managementicon" />
                    <span className="dropdown-title" id="managementcat">Managment</span>
                  </div>
                  <ul>
                    {/* تم تعديل هذا العنصر ليُوجه المستخدم إلى صفحة Statistics */}
                    <li className="dropdownNormalTitle" onClick={() => { navigate("/dashboard/statistics"); setDropdownOpen(false); }}>
                      <MdDashboard className="menu-icon" />
                      <span>Dashboard</span>
                    </li>
                  </ul>
                </div>
                <div className="dropdown-section">
                  <div className="dropdown-header">
                    <MdDisplaySettings className="dropdown-header-icon" />
                    <span className="dropdown-title">Experience</span>
                  </div>
                  <ul>
                    <li className="dropdownNormalTitle" onClick={() => { navigate("/dashboard/settings"); setDropdownOpen(false); }}>
                      <FaCogs className="menu-icon" />
                      <span>Settings</span>
                    </li>
                  </ul>
                </div>
                <div className="dropdown-section">
                  <div className="dropdown-header">
                    <FaUserShield className="dropdown-header-icon" />
                    <span className="dropdown-title">Authenticate</span>
                  </div>
                  <ul className="menuLogoutButton">
                  <li onClick={handleLogout}>
                    <FaSignOutAlt className="menu-icon" />
                    <span>Logout</span>
                  </li>
                 </ul>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* قائمة التنقل الجانبية */}
        <div className="menu">
          <h4>Main</h4>
          <NavLink
            to="/dashboard/statistics"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            <FaChartBar /> Statistics
          </NavLink>
          <NavLink
            to="/dashboard/meetings"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            <PiHandbagSimpleFill /> Meetings
          </NavLink>
          <NavLink
            to="/dashboard/target"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            <FaStar /> Target
          </NavLink>
          <h4>Finance</h4>
          <NavLink
            to="/dashboard/wallet"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            <FaWallet /> Wallet
          </NavLink>
          <NavLink
            to="/dashboard/bills"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            <FaMoneyBills /> Bills
          </NavLink>
          <h4>Authenticate</h4>
          <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
          </button>

        </div>
      </aside>
      <div className="dashboard-wrapper">
        <div className="content-container">
          <main className="dashboard-content">
            {loading ? (
              <p className="loading">🔄 Loading...</p>
            ) : error ? (
              <p className="error"> {error}</p>
            ) : (
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    {[
      { path: "statistics", component: <Statistics user={user} /> },
      { path: "meetings", component: <Meetings /> },
      { path: "target", component: <Target /> },
      { path: "wallet", component: <Wallet /> },
      { path: "bills", component: <Bills /> },
      { path: "terms", component: <Terms /> },
      { path: "contact", component: <Contact /> },
      { path: "discord", component: <DiscordPage /> },
      { path: "home", component: <DashboardHome /> },
      { path: "settings", component: <Settings /> },
    ].map(({ path, component }) => (
      <Route
        key={path}
        path={path}
        element={
          <motion.div
            layout
            initial={{ opacity: 0, x: 100 }} // تبدأ الصفحة من اليمين
            animate={{ opacity: 1, x: 0 }}  // تدخل إلى موضعها الطبيعي
            exit={{ opacity: 0, x: -100 }}  // تخرج إلى اليسار
            transition={{
              x: { duration: 0.3, ease: "easeOut" },
              opacity: { duration: 0.3 },
            }}
            style={{ width: "100%", position: "relative" }}
          >
            {component}
          </motion.div>
        }
      />
    ))}
  </Routes>
</AnimatePresence>

            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
    