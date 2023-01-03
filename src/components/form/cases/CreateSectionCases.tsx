import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Loader from "../../loader/Loader";
import SmallButton from "../../button/SmallButton";
import Form from "../core/Form";
import { AUTH_ROUTES, TEST_RAIL_SECTION_NAME_ATTRIBUTE, TEST_RAIL_PROJECT_ATTRIBUTE } from "../../../constants";
import { STATE_ROUTE_ATTRIBUTE } from "../../../constants/index";

const CreateSectionCases = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [sectionName, setSectionName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [helperText] = useState<string>("This field is required");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    localStorage.setItem(STATE_ROUTE_ATTRIBUTE, `${AUTH_ROUTES.CASES}${AUTH_ROUTES.SECTIONS}`);
  }, []);

  const handleClear = () => {
    setSectionName("");
    localStorage.removeItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE);
  };

  const handleType = (e: any) => {
    const value = e.target.value;
    if (value === "") {
      setError(true);
    } else {
      setError(false);
    }
    setSectionName(value);
    localStorage.setItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE, value);
  };

  const clearField = () => ({
    endAdornment: (<IconButton onClick={handleClear}>
      <ClearIcon />
    </IconButton>),
  });

  const handleNext = () => {
    const project = localStorage.getItem(TEST_RAIL_PROJECT_ATTRIBUTE);
    const projectId = project !== null
      ? JSON.parse(project).id
      : null;
    if (projectId === null) {
      navigate(AUTH_ROUTES.SETTINGS);
    } else {
      navigate(`${AUTH_ROUTES.CASES}${AUTH_ROUTES.COPY}`);
    }
  };

  const handleBack = () => {
    localStorage.removeItem(STATE_ROUTE_ATTRIBUTE);
    navigate(AUTH_ROUTES.DASHBOARD);
  };

  const content = isLoading
    ? <Loader/>
    : <>
      <Grid item className="form-item">
        <TextField
          placeholder="New section name"
          onChange={(e) => handleType(e)}
          value={sectionName}
          size="small"
          error={error}
          helperText={error ? helperText : ""}
          InputProps={clearField()}
          data-testid="create-section"
        />
      </Grid>
      <Grid item className="form-item" style={{width: "100%"}} id="buttons">
        <SmallButton handleClick={handleBack} text="Back"/>
        <SmallButton handleClick={handleNext} text="Next" disabled={sectionName === ""}/>
      </Grid>
    </>;

  return (
    <Form header="Create section to copy cases" content={content} />
  );
};

export default CreateSectionCases;
