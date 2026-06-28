import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {

    const isAuthenticated = true; // later JWT check

    return isAuthenticated
        ? <Outlet />
        : <Navigate to="/admin/login" replace />;
};

export default ProtectedAdminRoute;