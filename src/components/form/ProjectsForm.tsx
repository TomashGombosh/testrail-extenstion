import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Project from "../../types/Project";
import ProjectService from "../../service/api/ProjectService";
import { TEST_RAIL_EMAIL_ATTRIBUTE, TEST_RAIL_PROJECT_IDS_ATTRIBUTE, TEST_RAIL_TOKEN_ATTRIBUTE, TEST_RAIL_URL } from '../../constants';

import "./Form.css";


const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [checkedState, setCheckedState] = useState<boolean[]>(
        new Array(projects.length).fill(false)
      );
    const [projectIds, setProjectIds] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getProjects = async () => {
            const data = {
                url: TEST_RAIL_URL,
                email: localStorage.getItem(TEST_RAIL_EMAIL_ATTRIBUTE),
                apiToken: localStorage.getItem(TEST_RAIL_TOKEN_ATTRIBUTE),
            }
            const response = await ProjectService.getProjects(data);
            if(response.status === 200) {
                setProjects(response.data.projects);
                setLoading(false);
            }
        }

        getProjects();
    }, []);

    const handleOnChange = (position: any) => {
        setProjectIds(oldArray => [...oldArray, position.target.id]);
        const updatedCheckedState = checkedState.map((item, index) => 
            index === position ? !item : item   
        );
    
        setCheckedState(updatedCheckedState);

    };

    const handleClick = () => {
        const arrayToString = projectIds.join(",");
        localStorage.setItem(TEST_RAIL_PROJECT_IDS_ATTRIBUTE, arrayToString);
        navigate("/");
    }

    return (
            <>
            {isLoading && <CircularProgress />}
            {!isLoading && (
                <Grid container direction="row" alignItems="flex-start" alignContent="flex-start" className="form">
                    <Grid item>
                        <FormGroup>
                            {projects.map((project) => (
                                <FormControlLabel 
                                    key={project.id} 
                                    control={<Checkbox id={`${project.id}`} 
                                        checked={checkedState[project.id]} 
                                        onChange={(e) => handleOnChange(e)}
                                        disabled={project.name !== "Sandbox"}/>} 
                                    label={project.name} 
                                    className="text form-controll"/>
                            ))}
                        </FormGroup>
                    </Grid>
                    <Grid item style={{ paddingTop: "20px", width: "250px", margin: "auto" }}>
                    <Button variant="contained" className="form-button" onClick={handleClick}>Select</Button>
                    </Grid>
                </Grid>)}
        </>
    )
}

export default Projects;