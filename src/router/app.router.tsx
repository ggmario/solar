import { Routes, Route, Navigate } from 'react-router-dom';
import { ApprovedLayout } from '@layouts';
import { ProtectedRouter } from './index';
import { DashboardPage, MonitoringPage, LoginPage } from '@pages';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRouter />}>
        <Route path="/" element={<ApprovedLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="monitoring" element={<MonitoringPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
