import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  AUTH_ROUTES,
  AUTH_TOKEN_ATTRIBUTE,
  OK,
  PUBLIC_ROUTES,
  TEST_RAIL_PROJECT_ATTRIBUTE,
  TEST_RAIL_TEAM_SECTION,
  UNAUTHORIZED,
} from "../../../constants";
import Loader from "../../loader/Loader";
import Form from "../core/Form";
import SmallButton from "../../button/SmallButton";
import SectionService from "../../../service/api/SectionService";
import ErrorForm from "../core/ErrorForm";
import { Team } from "../../../types/Team";

const TeamsForm = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(teams.length).fill(false)
  );
  const [teamsSectionIds, setTeamsSectionIds] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const getTeams = async () => {
      const project = localStorage.getItem(TEST_RAIL_PROJECT_ATTRIBUTE);
      const projectId = project !== null
        ? JSON.parse(project).id
        : null;
      if (projectId !== null) {
        const response = await SectionService.getTeams(projectId);
        if (response.status === OK) {
          setTeams(response.data);
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
    setTeamsSectionIds(() => [position.target.id]);
    const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));

    setCheckedState(updatedCheckedState);
  };

  const handleClick = () => {
    localStorage.setItem(TEST_RAIL_TEAM_SECTION,
      JSON.stringify(teams.find((t: Team) => teamsSectionIds.includes(`${t.id}`))));
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
                onChange={(e) => handleOnChange(e)}/>
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

  return error === ""
    ? <Form header="Select Team" content={content}/>
    : <ErrorForm errorMessage={error}/>;
};

export default TeamsForm;
