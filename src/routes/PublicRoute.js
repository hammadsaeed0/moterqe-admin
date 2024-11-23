import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("diec_admin_id");
  return token ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;