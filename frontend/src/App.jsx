import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="https://egyxosoncode.github.io/abdulrahman-project392/" element={<Login />} />
          
          {/* عند الدخول إلى /dashboard مباشرة، يتم التوجيه إلى /dashboard/statistics */}
          <Route path="https://egyxosoncode.github.io/abdulrahman-project392/dashboard" element={<Navigate to="/dashboard/statistics" replace />} />

          {/* صفحات الـ Dashboard */}
          <Route path="https://egyxosoncode.github.io/abdulrahman-project392/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
