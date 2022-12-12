import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AUTH_TOKEN_ATTRIBUTE, AUTH_ROUTES, PUBLIC_ROUTES } from '../../constants';
import api from "../../service/api/api";

import "./Form.css";
import LoginService from '../../service/api/LoginService';
import { LoginRequest } from '../../models/requests/LoginRequest';

const LoginForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem(AUTH_TOKEN_ATTRIBUTE) !== null) {
                navigate(AUTH_ROUTES.DASHBOARD);
            }
    }, []);

    const handleClick = async () => {
        const response = await LoginService.login(new LoginRequest(email, password));
        if(response.status === 200) {
            const token = response.data.token;
            localStorage.setItem(AUTH_TOKEN_ATTRIBUTE, response.data.token);
            api.defaults.headers["Authorization"] = `Bearer ${token}`;
            navigate(AUTH_ROUTES.DASHBOARD);
        }
        
    }

    return (
        <Grid container direction="row" alignItems="center">
            <Grid item>
                <h2>Login</h2>
            </Grid>
            <Grid item className="token-screen-form-item">
                <TextField placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} size="small"/>
            </Grid>
            <Grid item className="token-screen-form-item">
                <TextField type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} size="small"/>
            </Grid>
            <Grid item className="token-screen-form-item">
                <Button onClick={handleClick} className="form-button" variant="contained">Login</Button>
            </Grid>
        </Grid>
    )
}

export default LoginForm;