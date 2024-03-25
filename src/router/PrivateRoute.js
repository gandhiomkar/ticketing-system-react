import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const UserRoute = () => {
  const user = useAuth();
  if (!user.token || user.user.role !== "user") return <Navigate to="/login" />;
  return <Outlet />;
};

const TechSupportRoute = () => {
  const user = useAuth();
  if (!user.token || user.user.role !== "techsupport")
    return <Navigate to="/login" />;
  return <Outlet />;
};

const AdminRoute = () => {
  const user = useAuth();
  if (!user.token || user.user.role !== "admin")
    return <Navigate to="/login" />;
  return <Outlet />;
};

export { UserRoute, TechSupportRoute, AdminRoute };
