import { Routes, Route, Navigate } from 'react-router-dom';
import { ApprovedLayout } from '@layouts';
import { ProtectedRouter } from './index';
import { DashboardPage } from '@pages';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRouter />}>
        <Route path="/" element={<ApprovedLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
