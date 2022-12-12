import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN_ATTRIBUTE, PUBLIC_ROUTES } from '../../constants';


const AuthenticatedRoute = (props: any) => {
  const navigate = useNavigate();
  if(localStorage.getItem(AUTH_TOKEN_ATTRIBUTE) == null) {
    navigate(PUBLIC_ROUTES.LOGIN);
  }
  return props.children
}

export default AuthenticatedRoute;