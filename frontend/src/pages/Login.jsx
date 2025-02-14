import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDiscord, FaCopy } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);

const handleLogin = async () => {
  try {
    // فتح نافذة المصادقة مع Discord
    const authWindow = window.open("http://localhost:5000/auth/discord", "_self");

    // التحقق بعد العودة من المصادقة
    window.addEventListener("message", (event) => {
      if (event.origin !== "http://localhost:5000") return; // التأكد من أن البيانات قادمة من السيرفر
      if (event.data.user) {
        localStorage.setItem("user", JSON.stringify(event.data.user)); // حفظ بيانات المستخدم
        navigate("/dashboard"); // توجيه المستخدم إلى لوحة التحكم
      }
    });
  } catch (error) {
    console.error("Login failed:", error);
  }
};


  const handleCopyIP = () => {
    const serverIP = "play.wildmc.net"; // ضع الـ IP الخاص بالسيرفر هنا
    navigator.clipboard.writeText(serverIP).then(() => {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000); // اختفاء التنبيه بعد 3 ثوانٍ
    });
  };

  return (
    <div className="login-container">
      {/* اللوجو الصغير في أعلى اليسار */}
      <div className="top-left-logo">
        <img src="/logo.png" alt="WildMC Logo" />
      </div>

      {/* المحتوى الرئيسي لصفحة تسجيل الدخول */}
      <div className="content">
        <h1>WildMC</h1>
        <p>Manage your WildMC server with ease. Access powerful tools and analytics to take your community to the next level.</p>
        <div className="buttons">
          <button className="login-btn" onClick={handleLogin}>
            <FaDiscord className="icon" /> Login with Discord
          </button>
          <button className="copy-btn" onClick={handleCopyIP}>
            <FaCopy className="icon" /> Copy Server IP
          </button>
        </div>
      </div>

      {/* تنبيه نسخ الـ IP */}
      {alertVisible && <div className="alert">Server IP copied to clipboard!</div>}

      {/* اللوجو الكبير على اليمين مع تأثير Overlay */}
      <div className="big-logo-container">
        <img src="/wildicon.webp" alt="WildMC Logo" className="big-logo" />
      </div>
    </div>
  );
};

export default Login;
