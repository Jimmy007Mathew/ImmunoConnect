import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import VaccineInfo from "./pages/VaccineInfo";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/adminLogin";
import HospitalDashboard from "./pages/HospitalDashboard";
import HospitalLogin from "./pages/HospitalLogin";
import HealthcareSignup from "./pages/HealthcareSignup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/info" element={<VaccineInfo />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
        <Route path="/hospital-login" element={<HospitalLogin />} />
        <Route path="/healthcare-signup" element={<HealthcareSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
