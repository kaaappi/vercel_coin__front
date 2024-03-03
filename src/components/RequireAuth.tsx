import React, { FC } from "react";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return <Navigate to={"/registration"} />;
  }

  return <>{children}</>;
};
export default RequireAuth;
