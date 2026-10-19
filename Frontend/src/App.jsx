import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";

// Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import Profile from "./pages/student/Profile";
import ResumeBuilder from "./pages/student/ResumeBuilder";

import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentList from "./pages/admin/StudentList";
import RankingPage from "./pages/admin/RankingPage";

import ATSScorePage from "./pages/student/ATSScorePage";
import CreateJobPage from "./pages/admin/CreateJobPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* STUDENT ROUTES */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="resume" element={<ResumeBuilder />} />
          <Route path="ats" element={<ATSScorePage />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<StudentList />} />
          <Route path="ranking" element={<RankingPage />} />
          <Route path="create-job" element={<CreateJobPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
