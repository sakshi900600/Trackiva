import { BrowserRouter, Routes, Route } from "react-router-dom";
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
// import ListViewTest from "./test/ListViewTest";

// import PlatformDetail from "./pages/platforms/platform-detail/PlatformDetail";
import Auth from "./pages/auth/Auth";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 16px",
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          {/* Auth Routes - Outside MainLayout (Full Page) */}

          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />

          {/* Protected Routes - Inside MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<ReportPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/job-detail" element={<JobDetailPage />} />
            {/* <Route path="/platform-detail" element={<PlatformDetail />} /> */}
            <Route path="/jobs/resumes" element={<ResumePage />} />
            <Route path="/jobs/interview-prep" element={<InterviewPrepPage />}/>
            <Route path="/jobs/cover-letters" element={<CoverLetterPage />} />

            {/* <Route path="/test" element={<ListViewTest />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
