import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import "./Form.css";
import { StoreUserTestRailDataRequest } from "../../types/requests";
import UserService from "../../service/api/UserService";
import { AUTH_ROUTES, OK } from "../../constants";

const TokenForm = () => {
  const [token, setToken] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  const handleClick = async () => {
    const request: StoreUserTestRailDataRequest = {
      url,
      apiKey: token,
    };
    const response = await UserService.updateTestRailData(request);
    if (response.status === OK) {
      navigate(AUTH_ROUTES.DASHBOARD);
    }
  };

  return (
    <Grid container direction="row" alignItems="center">
      <Grid item>
        <h2>Store you token</h2>
      </Grid>
      <Grid item className="token-screen-form-item">
        <TextField type="text" placeholder="Url" onChange={(e) => setToken(e.target.value)} value={token} size="small" />
      </Grid>
      <Grid item className="token-screen-form-item">
        <TextField type="password" placeholder="Token" onChange={(e) => setUrl(e.target.value)} value={url} size="small" />
      </Grid>
      <Grid item className="token-screen-form-item">
        <Button onClick={handleClick} className="form-button" variant="contained">Add</Button>
      </Grid>
    </Grid>
  );
};

export default TokenForm;
