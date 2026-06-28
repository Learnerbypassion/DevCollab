import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import Profile from "../pages/profile/Profile";
import DashboardLayout from "../components/common/DashboardLayout";
import Projects from "../pages/project/Project";
import Collabs from "../pages/collab/Collabs";
import Requests from "../pages/collab/Requests";
import JoinedProjects from "../pages/collab/JoinedProjects";

// ✅ IMPORT PROJECT PAGES
import CreateProject from "../pages/project/CreateProject";
import EditProject from "../pages/project/EditProject";
import ProjectDetails from "../pages/project/ProjectDetails";

const AppRoutes = () => {
  return (
    <Routes>
      {/* =========================
          PUBLIC ROUTES
      ========================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Collaboration routes */}
        <Route path="/collabs" element={<Collabs />} />
        <Route path="/collabs/requests" element={<Requests />} />
        <Route path="/collabs/joined" element={<JoinedProjects />} />

        {/* =========================
            PROJECT ROUTES
        ========================= */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/projects/edit/:projectId" element={<EditProject />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;