import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  // const { currentUser } = useSelector((state) => state);
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoutes;
