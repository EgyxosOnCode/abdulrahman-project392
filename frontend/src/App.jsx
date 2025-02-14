import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* عند الدخول إلى /dashboard مباشرة، يتم التوجيه إلى /dashboard/statistics */}
          <Route path="/dashboard" element={<Navigate to="/dashboard/statistics" replace />} />

          {/* صفحات الـ Dashboard */}
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
