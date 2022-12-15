import React from "react";
import { Navigate } from "react-router-dom";
import { AUTH_TOKEN_ATTRIBUTE, PUBLIC_ROUTES } from "../../constants";

// eslint-disable-next-line react/prop-types
const AuthenticatedRoute = (props: any) => {
  if (localStorage.getItem(AUTH_TOKEN_ATTRIBUTE) === null) {
    return (
      <Navigate to={PUBLIC_ROUTES.LOGIN} />
    );
  }
  return props.children;
};

export default AuthenticatedRoute;
