import { Navigate, Outlet } from "react-router-dom";
import storage from "./Crypto";

export const isAccountAdmin = () => {
    const role = storage.getItem("role");
    if (role === 'ACCOUNTADMIN') {
        return true;
    }
    return false;
};

const AccountAdmin = () => {
    const isAuth = isAccountAdmin();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AccountAdmin;