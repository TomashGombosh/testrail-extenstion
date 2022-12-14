import * as React from "react";
import { Navigate } from "react-router-dom";
import { AUTH_TOKEN_ATTRIBUTE, PUBLIC_ROUTES } from "../../constants";

const AuthenticatedRoute = ({ children: React. }) => {
  if (localStorage.getItem(AUTH_TOKEN_ATTRIBUTE) == null) {
    return (
      <Navigate to={PUBLIC_ROUTES.LOGIN} />
    );
  }
  return children;
};

export default AuthenticatedRoute;
