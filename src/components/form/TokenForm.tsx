import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { TEST_RAIL_TOKEN_ATTRIBUTE } from '../../constants';
import api from "../../service/api/api";

const TokenForm = () => {
    const [token, setToken] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const navigate = useNavigate();

    const handleClick = () => {
        const auth = `${email}:${token}`;
        navigate("/options");
    }

    return (
        <Grid container direction="row" alignItems="center">
            <Grid item>
                <h2>Store you token</h2>
            </Grid>
            <Grid item>
                <TextField placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </Grid>
            <Grid item>
                <TextField placeholder="Token" onChange={(e) => setToken(e.target.value)} value={token}/>
            </Grid>
            <Grid item>
                <Button onClick={handleClick}>Submit</Button>
            </Grid>
        </Grid>
    )
}

export default TokenForm;