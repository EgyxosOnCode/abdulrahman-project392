import React, { createContext, useContext, useState, useEffect } from "react";

// إنشاء سياق المصادقة
const AuthContext = createContext();

// مزود المصادقة
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب حالة المصادقة عند تحميل التطبيق
    fetch("http://localhost:5000/auth/status", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.message) {
          setUser(data);
        }
      })
      .catch((err) => console.error("Authentication error:", err))
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    fetch("http://localhost:5000/auth/logout", {
      credentials: "include",
    })
      .then(() => setUser(null))
      .catch((err) => console.error("Logout error:", err));
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// دالة لاستخدام بيانات المصادقة في أي مكون
export const useAuth = () => {
  return useContext(AuthContext);
};
