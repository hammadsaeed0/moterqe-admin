import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = ({ component: component, ...rest }) => {
  const token = localStorage.getItem("diec_admin_id");
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
