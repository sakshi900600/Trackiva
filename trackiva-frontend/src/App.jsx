import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/main-layout/MainLayout";
import ReportPage from "./pages/reports/ReportPage";
import Analytics from "./pages/analytics/Analytics";
import Platforms from "./pages/platforms/Platforms";
import Jobs from "./pages/jobs/Jobs";
import Dashboard from "./pages/dashboard/dashboard";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/profile/Profile";
import JobDetailPage from "./pages/jobs/job-detail-page/JobDetailPage";
import ResumePage from "./pages/jobs/resume-page/ResumePage";
import InterviewPrepPage from "./pages/jobs/interview-prep-page/InterviewPrepPage";
import CoverLetterPage from "./pages/jobs/cover-letter-page/CoverLetterPage";
import Auth from "./pages/auth/Auth";
import HomePage from "./pages/home-page/HomePage";
import PlatformDetail from "./pages/platforms/platform-detail/PlatformDetail";
import ResetPassword from "./pages/auth/ResetPassword";

// Simple auth check
const isAuthenticated = () => !!localStorage.getItem("token");

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <BrowserRouter>
        <Routes>

          {/* Landing Page */}
          <Route
            path="/"
            element={isAuthenticated() ? <Navigate to="/dashboard" /> : <HomePage />}
          />

          {/* Auth */}
          <Route path="/login" element={<Auth />} />

          {/* ✅ Reset password must be PUBLIC — outside protected routes
              so users coming from email link don't get redirected to login */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route
            element={isAuthenticated() ? <MainLayout /> : <Navigate to="/" />}
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<ReportPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/platforms/:platformName" element={<PlatformDetail />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/jobs/resumes" element={<ResumePage />} />
            <Route path="/jobs/interview-prep" element={<InterviewPrepPage />} />
            <Route path="/jobs/cover-letters" element={<CoverLetterPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;