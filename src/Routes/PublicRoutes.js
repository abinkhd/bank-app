import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  // Redirect authenticated users to "/dashboard"
  return token ? <Navigate to="/userHome" replace /> : <Outlet />;
};

export default PublicRoute;
