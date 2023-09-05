import { Routes, Route, Navigate } from "react-router-dom";
import { Auth } from './pages/auth/auth';
import { LinkApp } from './pages/link/link';


const AppRouter = () => {
  return (
    <Routes>
      <Route key={'auth'} path={'/auth'} element={<Auth />} />
      <Route key={'link'} path={'/link'} element={<LinkApp />} />
      <Route
        path="*"
        element={
          <Navigate to="/link" />
        }
      />
    </Routes>
  );
};

export default AppRouter;