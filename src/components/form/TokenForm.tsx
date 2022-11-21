import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { TEST_RAIL_EMAIL_ATTRIBUTE, TEST_RAIL_TOKEN_ATTRIBUTE } from '../../constants';

import "./Form.css";

const TokenForm = () => {
    const [token, setToken] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem(TEST_RAIL_EMAIL_ATTRIBUTE) !== null 
            && localStorage.getItem(TEST_RAIL_TOKEN_ATTRIBUTE) !== null) {
                navigate("/");
            }
    }, []);

    const handleClick = () => {
        navigate("/projects");
        localStorage.setItem(TEST_RAIL_TOKEN_ATTRIBUTE, token);
        localStorage.setItem(TEST_RAIL_EMAIL_ATTRIBUTE, email);
    }

    return (
        <Grid container direction="row" alignItems="center">
            <Grid item>
                <h2>Store you token</h2>
            </Grid>
            <Grid item className="token-screen-form-item">
                <TextField placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} size="small"/>
            </Grid>
            <Grid item className="token-screen-form-item">
                <TextField type="password" placeholder="Token" onChange={(e) => setToken(e.target.value)} value={token} size="small"/>
            </Grid>
            <Grid item className="token-screen-form-item">
                <Button onClick={handleClick} className="form-button" variant="contained">Submit</Button>
            </Grid>
        </Grid>
    )
}

export default TokenForm;