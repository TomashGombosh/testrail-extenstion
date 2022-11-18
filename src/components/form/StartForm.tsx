import React from "react";
import { Link } from "react-router-dom"
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const StartForm = () => (
    <>
        <Grid item>
            <h2>Welcome to the TestRail extension</h2>
        </Grid>
        <Grid item>
            <Button component={Link} to="/token">Fill your token</Button>
        </Grid>
        <Grid item>
            <Button component={Link} to="/projects">Get projects</Button>
        </Grid>
    </>
)

export default StartForm;