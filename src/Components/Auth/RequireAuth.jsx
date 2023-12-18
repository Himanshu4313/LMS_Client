import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowedRoles }) {

    const {data} = useSelector((state) => state?.auth);
    console.log(data);
     const role = data.role;
     const isLoggedIn = data.isLoggedIn;
    return (
        <>
            {
                isLoggedIn && allowedRoles.find((myRole) => myRole === role) ? (
                    <Outlet />
                ) : isLoggedIn ? (<Navigate to="/denied" />) : (<Navigate to="/login" />)
            }
        </>
    );

}
export default RequireAuth;