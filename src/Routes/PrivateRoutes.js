import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  // const { currentUser } = useSelector((state) => state);
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(currentUser);

  if (!token) return <Navigate to="/" />;
  return <Outlet />;
};

export default PrivateRoutes;
