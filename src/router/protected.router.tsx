import { Navigate, Outlet } from 'react-router-dom';
const isAuthed = () => !!localStorage.getItem('ACCESS_TOKEN');
// 예시 구현
export function ProtectedRouter() {
  // const { isLoggedIn, hasPermission } = useAuthStore();
  // if (!isLoggedIn || !hasPermission) {
  //   return <Navigate to="/unapproved" replace />;
  // }
  if (!isAuthed()) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default ProtectedRouter;
