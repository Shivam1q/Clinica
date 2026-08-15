import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import BillingPage from "./pages/BillingPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import PatientPortalPage from "./pages/PatientPortalPage";
import PatientTimelinePage from "./pages/PatientTimelinePage";
import SchedulePage from "./pages/SchedulePage";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/patients/:id" element={<PatientTimelinePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/portal" element={<PatientPortalPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
