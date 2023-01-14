import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Loader from "../../loader/Loader";
import SmallButton from "../../button/SmallButton";
import Form from "../core/Form";
import { AUTH_ROUTES,
  TEST_RAIL_REFERENCES_ATTRIBUTE,
  TEST_RAIL_CASES_IDS_ATTRIBUTE,
  TEST_RAIL_SECTION_NAME_ATTRIBUTE,
  TEST_RAIL_PROJECT_ATTRIBUTE,
} from "../../../constants";
import { UpdateTestCasesRequest } from "../../../types/requests";
import { OK } from "../../../constants/statusCodes";
import CasesService from "../../../service/api/CasesService";
import { STATE_ROUTE_ATTRIBUTE } from "../../../constants/index";

const CreateSectionCases = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [references, setRefrences] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [helperText] = useState<string>("This field is required");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    localStorage.setItem(STATE_ROUTE_ATTRIBUTE, `${AUTH_ROUTES.CASES}${AUTH_ROUTES.REFERENCES}`);
  }, []);

  const handleClear = () => {
    setRefrences("");
    localStorage.removeItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE);
  };

  const handleType = (e: any) => {
    const value = e.target.value;
    if (value === "") {
      setError(true);
    } else {
      setError(false);
    }
    setRefrences(e.target.value.replace(/ /g, ","));
    localStorage.setItem(TEST_RAIL_REFERENCES_ATTRIBUTE, references);
  };

  const clearField = () => ({
    endAdornment: (<IconButton onClick={handleClear}>
      <ClearIcon />
    </IconButton>),
  });

  const handleSubmit = async () => {
    setLoading(true);
    const project = localStorage.getItem(TEST_RAIL_PROJECT_ATTRIBUTE);
    const projectId = project !== null
      ? JSON.parse(project).id
      : null;
    const sectionId = localStorage.getItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE);
    const casesIds = localStorage.getItem(TEST_RAIL_CASES_IDS_ATTRIBUTE)?.replaceAll(/C/g, "").split(",") || [];

    if (projectId === null) {
      navigate(`${AUTH_ROUTES.SETTINGS}`);
    } else {
      const request: UpdateTestCasesRequest = {
        projectId,
        sectionId: sectionId || "",
        casesIds: casesIds,
        references: references || "",
      };
      const casesResponse = await CasesService.copyTestCases(request);
      if (casesResponse.status === OK) {
        navigate(AUTH_ROUTES.DASHBOARD);
        localStorage.removeItem(TEST_RAIL_CASES_IDS_ATTRIBUTE);
        localStorage.removeItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE);
        localStorage.removeItem(TEST_RAIL_REFERENCES_ATTRIBUTE);
        localStorage.removeItem(STATE_ROUTE_ATTRIBUTE);
      }
    }
  };

  const content = isLoading
    ? <Loader/>
    : <>
      <Grid item className="form-item">
        <TextField
          placeholder="References"
          onChange={(e) => handleType(e)}
          value={references}
          size="small"
          error={error}
          helperText={error ? helperText : ""}
          InputProps={clearField()}
          data-testid="references"
        />
      </Grid>
      <Grid item className="form-item" style={{width: "100%"}} id="buttons">
        <SmallButton handleClick={() => navigate(AUTH_ROUTES.COPY)} text="Back"/>
        <SmallButton handleClick={handleSubmit} text="Submit" disabled={references === ""}/>
      </Grid>
    </>;

  return (
    <Form header="Add references to the cases" content={content} />
  );
};

export default CreateSectionCases;
