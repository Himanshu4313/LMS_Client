import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const location = useLocation();

  return isLoggedIn && allowedRoles.find((myRole) => myRole === role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to={"/denied"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;

































// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// function RequireAuth({ allowedRoles }) {

//     const data = useSelector((state) => state?.auth?.data);
//     console.log(data);
//      const role = data.role;
//      const isLoggedIn = data.isLoggedIn;
//     return (
//         <>
//             {
//                 isLoggedIn && allowedRoles.find((myRole) => myRole === role) ? (
//                     <Outlet />
//                 ) : isLoggedIn ? (<Navigate to="/denied" />) : (<Navigate to="/login" />)
//             }
//         </>
//     );

// }
// export default RequireAuth;