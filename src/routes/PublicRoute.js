import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("ceat_admin_user");
  return token ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;