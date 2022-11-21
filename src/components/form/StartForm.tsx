import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import { TEST_RAIL_EMAIL_ATTRIBUTE, TEST_RAIL_PROJECT_IDS_ATTRIBUTE, TEST_RAIL_TOKEN_ATTRIBUTE } from "../../constants";
import "./Form.css";

const StartForm = () => {
    const [ isLoading, setLoading] = useState<boolean>(true);
    const [ isDisplaySetToken, setDisplaySetToken ] = useState<boolean>(localStorage.getItem(TEST_RAIL_EMAIL_ATTRIBUTE) === null &&
        localStorage.getItem(TEST_RAIL_TOKEN_ATTRIBUTE) === null);
    const [ isDisplaySetProjects, setDisplaySetProjects ] = useState<boolean>(localStorage.getItem(TEST_RAIL_PROJECT_IDS_ATTRIBUTE) === null);
    const navigate = useNavigate();

    
    useEffect(() => {
        setDisplaySetToken(localStorage.getItem(TEST_RAIL_EMAIL_ATTRIBUTE) === null &&
            localStorage.getItem(TEST_RAIL_TOKEN_ATTRIBUTE) === null);
        setLoading(false);
    }, [isLoading])

    const handleLogout = () => {
        setLoading(true);
        localStorage.removeItem(TEST_RAIL_EMAIL_ATTRIBUTE);
        localStorage.removeItem(TEST_RAIL_TOKEN_ATTRIBUTE);
        localStorage.removeItem(TEST_RAIL_PROJECT_IDS_ATTRIBUTE);
        navigate("/");
    }

    return (<Grid container direction="row" alignItems="flex-start" alignContent="flex-start" className="form">
        {isLoading && <CircularProgress />}
        {!isLoading && (<>
        {isDisplaySetToken && (<Grid item className="start-screen-form-item">
            <Button component={Link} to="/token" className="form-button" variant="contained">Fill your token</Button>
        </Grid>)}
        {!isDisplaySetToken && (<Grid item className="start-screen-form-item">
            <Button component={Link} to="/projects" className="form-button" variant="contained">{isDisplaySetProjects ? "Set projects" : "Update projects"}</Button>
        </Grid>)}
        {!isDisplaySetToken && !isDisplaySetProjects && (<Grid item className="start-screen-form-item">
            <Button component={Link} to="/work" className="form-button" variant="contained">Work with test cases</Button>
        </Grid>)}
        {!isDisplaySetToken && !isDisplaySetProjects && (<Grid item className="start-screen-form-item">
            <Button component={Link} to="/replace" className="form-button" variant="contained" disabled>Replace test cases</Button>
        </Grid>)}
        {!isDisplaySetToken && !isDisplaySetProjects && (<Grid item className="start-screen-form-item">
            <Button onClick={handleLogout} className="form-button" variant="contained">Logout</Button>
        </Grid>)}
        </>)}
    </Grid>)
}

export default StartForm;