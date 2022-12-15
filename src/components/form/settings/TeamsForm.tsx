import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Project from "../../../types/Project";
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
import SectionService from "../../../service/api/SectionService";

const TeamsForm = () => {
  const [teams, setTeams] = useState<Project[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(teams.length).fill(false)
  );
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const getTeams = async () => {
      const projectId = localStorage.getItem(TEST_RAIL_PROJECT_IDS_ATTRIBUTE);
      if (projectId !== null) {
        const response = await SectionService.getTeams(projectId);
        if (response.status === OK) {
          setTeams(response.data.projects);
          setLoading(false);
        } else if (response.status === UNAUTHORIZED) {
          localStorage.removeItem(AUTH_TOKEN_ATTRIBUTE);
          navigate(PUBLIC_ROUTES.LOGIN);
        } else {
          setLoading(false);
          setError(response.data.error);
        }
      } else {
        navigate(`${AUTH_ROUTES.SETTINGS}${AUTH_ROUTES.PROJECTS}`);
      }
    };

    getTeams();
  }, []);

  const handleOnChange = (position: any) => {
    setProjectIds(() => [position.target.id]);
    const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));

    setCheckedState(updatedCheckedState);
  };

  const handleClick = () => {
    const arrayToString = projectIds.join(",");
    localStorage.setItem(TEST_RAIL_PROJECT_IDS_ATTRIBUTE, arrayToString);
    navigate(AUTH_ROUTES.SETTINGS);
  };

  const content = isLoading
    ? <Loader />
    : (<Grid container>
      <Grid item><FormGroup>
        {teams.map((team) => (
          <FormControlLabel
            key={team.id}
            control={(
              <Checkbox
                id={`${team.id}`}
                checked={checkedState[team.id]}
                onChange={(e) => handleOnChange(e)}
                disabled={team.name !== "Sandbox"} />
            )}
            label={team.name}
            className="text form-controll" />
        ))}
      </FormGroup>
      </Grid>
      <Grid item style={{width: "100%"}} id="buttons">
        <SmallButton handleClick={() => navigate(AUTH_ROUTES.SETTINGS)} text="Back" />
        <SmallButton handleClick={handleClick} text="Select" />
      </Grid>
    </Grid>);
  const errorContent =
    <Grid item>
      <span>{error}</span>
      <SmallButton handleClick={() => navigate(AUTH_ROUTES.SETTINGS)} text="Back" />
    </Grid>;

  return error === ""
    ? <Form header="Select Team" content={content}/>
    : <Form header="Something went wrong" content={errorContent}/>;
};

export default TeamsForm;