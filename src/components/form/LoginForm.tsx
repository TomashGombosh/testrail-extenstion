import React, { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "../button/Button";
import TextField from "@mui/material/TextField";
import { AUTH_TOKEN_ATTRIBUTE, AUTH_ROUTES, OK } from "../../constants";
import api from "../../service/api/api";
import LoginService from "../../service/api/LoginService";
import { LoginRequest } from "../../types/requests/LoginRequest";
import Form from "./core/Form";
import Loader from "../loader/Loader";

const LoginForm = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(AUTH_TOKEN_ATTRIBUTE) !== null) {
      navigate(AUTH_ROUTES.DASHBOARD);
    }
    setLoading(false);
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const request: LoginRequest = {
      email,
      password,
    };
    const response = await LoginService.login(request);
    if (response.status === OK) {
      const { token } = response.data;
      localStorage.setItem(AUTH_TOKEN_ATTRIBUTE, response.data.token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      navigate(AUTH_ROUTES.DASHBOARD);
    }
    setLoading(false);
  };

  const content: ReactNode = isLoading
    ? <Loader />
    : (<><Grid item className="form-item">
      <TextField placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} size="small" />
    </Grid><Grid item className="form-item">
      <TextField type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} size="small" />
    </Grid><Grid item className="form-item">
      <Button handleClick={handleClick} text="Login" />
    </Grid></>);

  return (<Form content={content} header="Login" />);
};

export default LoginForm;
