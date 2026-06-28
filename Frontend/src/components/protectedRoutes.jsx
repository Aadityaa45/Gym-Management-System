import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { gymAppContext } from "../contexts/gymAuthContext";
const ProtectedAdminRoute = () => {

    const { loading, isLoggedIn } = useContext(gymAppContext);

    if (loading)
        return <h1>Loading...</h1>;

    if (!isLoggedIn)
        return <Navigate to="/admin/login" replace />;

    return <Outlet />;
};

export default ProtectedAdminRoute;