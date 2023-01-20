import React, { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Button from "../button/Button";
import { AUTH_TOKEN_ATTRIBUTE, AUTH_ROUTES, OK } from "../../constants";
import api from "../../service/api/api";
import LoginService from "../../service/api/LoginService";
import { LoginRequest } from "../../types/requests/LoginRequest";
import Form from "./core/Form";
import Loader from "../loader/Loader";

const LoginForm = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isShowPassowrd, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
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
      localStorage.setItem(AUTH_TOKEN_ATTRIBUTE, token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      navigate(AUTH_ROUTES.DASHBOARD);
    }
    setError(response.data.error);
    setLoading(false);
  };

  const showPassword = () => ({
    endAdornment: (
      <Tooltip
        title="Show password"
        arrow
        placement="top-end"
      ><IconButton onClick={() => setShowPassword(!isShowPassowrd)}>
          {isShowPassowrd ? (<VisibilityIcon />) : (<VisibilityOffIcon/>)}
        </IconButton>
      </Tooltip>),
  });

  const handleEnter = async (e: any) => {
    if (e.key === "Enter") {
      await handleClick();
    }
  };

  const content: ReactNode = isLoading
    ? <Loader />
    : (<>
      <Grid item className="form-item">
        <TextField
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          size="small"
          data-testid="email"/>
      </Grid>
      <Grid item className="form-item">
        <TextField
          fullWidth
          type={isShowPassowrd ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          size="small"
          onKeyPress={(e) => handleEnter(e)}
          data-testid="password"
          InputProps={showPassword()}
        />
      </Grid>
      <Grid item className="form-item">
        <Button handleClick={handleClick} text="Login" />
      </Grid>
      {error !== "" && (<Grid item className="form-item">
        <div className="text error">{error}</div>
      </Grid>)}
    </>);

  return (<Form content={content} header="Login" />);
};

export default LoginForm;
