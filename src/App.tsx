import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import './App.css';

const App = (props: any) => {
  const navigate = useNavigate();

  useEffect(() => {
  }, [navigate])

  return (
    <Grid container direction="row" alignItems="center" className="extension">
        <Grid item className="header">
          <h2>Welcome to the TestRail extension</h2>
        </Grid>
        <Grid item className="content">
          {props.children}
        </Grid>
        <Grid item className="footer">
          © 2022 iDeals. All rights reserved.
        </Grid>
    </Grid>

  );
}

export default App;
