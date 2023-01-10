import React, { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "../button/SmallButton";
import { AUTH_ROUTES, CREATED, IS_ADMIN_LOGGED_IN, API_KEY } from "../../constants";
import Form from "./core/Form";
import Loader from "../loader/Loader";
import { RegisterUserRequest } from "../../types/requests";
import UserService from "../../service/api/UserService";

const RegistrationForm = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(IS_ADMIN_LOGGED_IN) === null) {
      navigate(AUTH_ROUTES.DASHBOARD);
    }
    setLoading(false);
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const request: RegisterUserRequest = {
      email,
      apiKey: API_KEY,
    };
    const response = await UserService.register(request);
    if (response.status === CREATED) {
      navigate(AUTH_ROUTES.DASHBOARD);
    }
    setLoading(false);
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
      <Grid item className="form-item" style={{width: "100%"}} id="buttons">
        <Button handleClick={() => navigate(AUTH_ROUTES.DASHBOARD)} text="Back" />
        <Button
          handleClick={handleClick}
          text="Register"/>
      </Grid>
    </>);

  return (<Form content={content} header="Register new user" />);
};

export default RegistrationForm;
