import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "../button/Button";
import { StoreUserTestRailDataRequest } from "../../types/requests";
import UserService from "../../service/api/UserService";
import { AUTH_ROUTES, OK } from "../../constants";

import "./Form.css";
import Loader from "../loader/Loader";
import Form from "./Form";

const TokenForm = () => {
  const [isLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const navigate = useNavigate();

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

  const fields = [
    {
      element: (<TextField type="text" placeholder="Url" onChange={(e) => setToken(e.target.value)} value={token} size="small" />),
    },
    {
      element: (<TextField type="password" placeholder="Token" onChange={(e) => setUrl(e.target.value)} value={url} size="small" />),
    },
    {
      element: (<Button handleClick={handleClick} text="Add"/>),
    },
    {
      element: (<Button handleClick={() => navigate(AUTH_ROUTES.SETTINGS)} text="Back"/>),
    },
  ];

  const content = isLoading
    ? <Loader />
    : fields.map((el, index) => (
      <Grid item key={index} className="form-item">
        {el.element}
      </Grid>
    ));
  return (<Form header="Store you token" content={content} />);
};

export default TokenForm;
