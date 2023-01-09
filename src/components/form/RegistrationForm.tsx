import React, { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import Button from "../button/SmallButton";
import { AUTH_ROUTES, OK, IS_ADMIN_LOGGED_IN } from "../../constants";
import Form from "./core/Form";
import Loader from "../loader/Loader";
import { RegisterUserRequest } from "../../types/requests";
import UserService from "../../service/api/UserService";

const RegistrationForm = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isShowToken, setShowToken] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(IS_ADMIN_LOGGED_IN) === null) {
      navigate(AUTH_ROUTES.DASHBOARD);
    }
    setLoading(false);
  }, []);

  const showToken = (onClickFunction: any,
    isShowIcon: boolean,
    disabled: boolean) => ({
    endAdornment: (
      <Tooltip
        title="Show password"
        arrow
        placement="top-end"
        disableHoverListener={disabled}
        disableFocusListener={disabled}
      ><IconButton onClick={onClickFunction} disabled={disabled}>
          {isShowIcon ? (<VisibilityIcon />) : (<VisibilityOffIcon/>)}
        </IconButton>
      </Tooltip>),
  });

  const handleClick = async () => {
    setLoading(true);
    const request: RegisterUserRequest = {
      email,
      apiKey,
    };
    const response = await UserService.register(request);
    if (response.status === OK) {
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
      </Grid><Grid item className="form-item">
        <TextField
          type={isShowToken ? "text" : "password"}
          placeholder="API Key"
          onChange={(e) => setApiKey(e.target.value)}
          value={apiKey}
          size="small"
          data-testid="apiKey"
          InputProps={showToken(
            () => setShowToken(!isShowToken),
            isShowToken,
            false)}/>
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
