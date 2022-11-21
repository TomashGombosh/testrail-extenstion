import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { TEST_RAIL_EMAIL_ATTRIBUTE, TEST_RAIL_PROJECT_IDS_ATTRIBUTE, TEST_RAIL_TOKEN_ATTRIBUTE, TEST_RAIL_URL } from '../../constants';

import "./Form.css";
import SectionService from '../../service/api/SectionService';
import CasesService from '../../service/api/CasesService';


const WorkForm = () => {
    const [isLoading, setLoading] = useState(true);
    const [sectionName, setSectionName] = useState<string>("");
    const [casesIds, setCasesIds] = useState<string>("");
    const [reference, setReference] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem(TEST_RAIL_EMAIL_ATTRIBUTE) === null 
            && localStorage.getItem(TEST_RAIL_TOKEN_ATTRIBUTE) === null) {
                navigate("/token");
            }
        setLoading(false);
    }, [navigate]);


    const handleCasesId = (e: any) => {
        setCasesIds(e.target.value.replace(/ /g, ","));
    }

    const handleReference = (e: any) => {
        setReference(e.target.value.replace(/ /g, ","));
    }

    const handleClick = async () => { 
        setLoading(true);
        const data = {
            url: TEST_RAIL_URL,
            email: localStorage.getItem(TEST_RAIL_EMAIL_ATTRIBUTE),
            apiToken: localStorage.getItem(TEST_RAIL_TOKEN_ATTRIBUTE),
        }
        const projectId = localStorage.getItem(TEST_RAIL_PROJECT_IDS_ATTRIBUTE);
        if(projectId === null) {
            navigate("/projects");
        } else {
            const sectionResponse = await SectionService.createSection(data, projectId, sectionName);
            console.log(sectionResponse.status);
            if (sectionResponse.status === 200) {
                const sectionId = sectionResponse.data.id;
                const casesResponse = await CasesService.updateTestCases(
                    data, 
                    projectId,
                    sectionId,
                    casesIds.replaceAll(/C/g, "").split(","),
                    reference
                );
                if(casesResponse.status === 200) {
                    navigate("/");
                }
            }
        }
    }

    return (<>
        {isLoading && <CircularProgress />}
        {!isLoading && (<Grid container direction="row" alignItems="center">
       
            <Grid item>
                <h2>Work with test cases form</h2>
            </Grid>
            <Grid item className="work-screen-form-item">
                <TextField placeholder="New section name" onChange={(e) => setSectionName(e.target.value)} value={sectionName} size="small"/>
            </Grid>
            <Grid item className="work-screen-form-item">
                <TextField placeholder="Cases ids" onChange={(e) => handleCasesId(e)} value={casesIds} size="small"/>
            </Grid>
            <Grid item className="work-screen-form-item">
                <TextField placeholder="References" onChange={(e) => handleReference(e.target.value)} value={reference} size="small"/>
            </Grid>
            <Grid item className="work-screen-form-item">
                <Button onClick={handleClick} className="form-button" variant="contained">Submit</Button>
            </Grid>
        </Grid>)}
        </>
    )
}

export default WorkForm;