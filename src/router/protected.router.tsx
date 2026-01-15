import { Outlet } from 'react-router-dom';

// 예시 구현
export function ProtectedRouter() {
  // const { isLoggedIn, hasPermission } = useAuthStore();
  // if (!isLoggedIn || !hasPermission) {
  //   return <Navigate to="/unapproved" replace />;
  // }
  return <Outlet />;
}

export default ProtectedRouter;
