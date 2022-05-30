import { Navigate, Outlet } from "react-router-dom";
import storage from "./Crypto";


export const isSuperAdmin = () => {
    const role = storage.getItem("role");//A
    // console.log('checking role in localStorage')
    if (role === 'SUPERADMIN') {
        return true;
    }else{

        return false;
    }
};

const SuperAdmin = () => {
    const isAuth = isSuperAdmin();
    console.log(isAuth)
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default SuperAdmin;