import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Project from "../../../types/Project";
import ProjectService from "../../../service/api/ProjectService";
import {
  AUTH_ROUTES,
  AUTH_TOKEN_ATTRIBUTE,
  OK,
  PUBLIC_ROUTES,
  TEST_RAIL_PROJECT_IDS_ATTRIBUTE,
  UNAUTHORIZED,
} from "../../../constants";
import Loader from "../../loader/Loader";
import Form from "../core/Form";
import SmallButton from "../../button/SmallButton";
import ErrorForm from "../core/ErrorForm";

const ProjectsForm = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(projects.length).fill(false)
  );
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      const response = await ProjectService.getProjects();
      if (response.status === OK) {
        setProjects(response.data.projects);
        setLoading(false);
      } else if (response.status === UNAUTHORIZED) {
        localStorage.removeItem(AUTH_TOKEN_ATTRIBUTE);
        navigate(PUBLIC_ROUTES.LOGIN);
      } else {
        setLoading(false);
        setError(response.data.message);
      }
    };

    getProjects();
  }, []);

  const handleOnChange = (position: any) => {
    setProjectIds(() => [position.target.id]);
    const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));

    setCheckedState(updatedCheckedState);
  };

  const handleClick = () => {
    localStorage.setItem(TEST_RAIL_PROJECT_IDS_ATTRIBUTE,
      JSON.stringify(projects.filter((p: Project) => projectIds.includes(`${p.id}`))));
    navigate(AUTH_ROUTES.SETTINGS);
  };

  const content = isLoading
    ? <Loader />
    : (<Grid container>
      <Grid item><FormGroup>
        {projects.map((project) => (
          <FormControlLabel
            key={project.id}
            control={(
              <Checkbox
                id={`${project.id}`}
                checked={checkedState[project.id]}
                onChange={(e) => handleOnChange(e)}
              />
            )}
            label={project.name}
            className="text form-controll" />
        ))}
      </FormGroup>
      </Grid>
      <Grid item style={{width: "100%"}} id="buttons">
        <SmallButton handleClick={() => navigate(AUTH_ROUTES.SETTINGS)} text="Back" />
        <SmallButton handleClick={handleClick} text="Select" />
      </Grid>
    </Grid>);
  return error === ""
    ? <Form header="Select Project" content={content}/>
    : <ErrorForm errorMessage={error}/>;
};

export default ProjectsForm;
