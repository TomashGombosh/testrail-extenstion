import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./App.css";
import { AUTH_TOKEN_ATTRIBUTE, PUBLIC_ROUTES } from "./constants";
import api from "./service/api/api";
import Loader from "./components/loader/Loader";

export type MainProps = {
  children: ReactNode,
  isShowHeader: boolean
}

const App = (props: MainProps) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem(AUTH_TOKEN_ATTRIBUTE) === null) {
      navigate(PUBLIC_ROUTES.LOGIN);
    } else {
      api.defaults.headers.Authorization = `Bearer ${localStorage.getItem(AUTH_TOKEN_ATTRIBUTE)}`;
    }
    setLoading(false);
  }, [navigate]);

  return (
    <Grid container direction="row" alignItems="center" className="extension">
      <Grid item className="header">
        {props.isShowHeader && (<h2>Welcome to the TestRail extension</h2>)}
      </Grid>
      <Grid item className="content">
        {isLoading ? <Loader/> : props.children}
      </Grid>
      <Grid item className="footer">
        © 2022-2023. All rights reserved.
      </Grid>
    </Grid>

  );
};

export default App;
