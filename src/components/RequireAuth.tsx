import React, { FC } from "react";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const token = localStorage.getItem("jwtToken");
  console.log(!token); //TODO норм? при регистрации мне токен не отдаётся и он undefined
  if (!token) {
    return <Navigate to={"/registration"} />;
  }

  return <>{children}</>;
};
export default RequireAuth;
