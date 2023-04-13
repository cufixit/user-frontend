import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AccountContext } from "./AccountContext";

const PrivateRoutes = () => {
  const location = useLocation();

  const { session } = useContext(AccountContext);

  return session ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
