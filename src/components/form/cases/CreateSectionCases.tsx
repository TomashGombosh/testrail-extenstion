import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Loader from "../../loader/Loader";
import SmallButton from "../../button/SmallButton";
import Form from "../core/Form";
import { AUTH_ROUTES,
  TEST_RAIL_SECTION_NAME_ATTRIBUTE,
  TEST_RAIL_PROJECT_ATTRIBUTE,
  DEFAULT_ERROR_MESSAGE } from "../../../constants";
import { STATE_ROUTE_ATTRIBUTE } from "../../../constants/index";
import { CreateSectionRequest, SectionQuery } from "../../../types/requests";
import SectionService from "../../../service/api/SectionService";
import { OK } from "../../../constants/statusCodes";
import { AxiosResponse } from "axios";

const CreateSectionCases = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [sectionName, setSectionName] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>(DEFAULT_ERROR_MESSAGE);
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
  };

  const clearField = () => ({
    endAdornment: (<IconButton onClick={handleClear}>
      <ClearIcon />
    </IconButton>),
  });

  const getProjectFromLocalStorage = () => {
    const project = localStorage.getItem(TEST_RAIL_PROJECT_ATTRIBUTE);
    return project !== null
      ? JSON.parse(project)
      : null;
  };

  const createNewSection = async (projectId: string): Promise<AxiosResponse> => {
    const createSectionRequest: CreateSectionRequest = {
      projectId: parseInt(projectId),
      name: sectionName || "",
      description: sectionName || "",
    };
    const sectionResponse = await SectionService.createSection(createSectionRequest);
    return sectionResponse;
  };

  const getSection = async (projectId: string): Promise<AxiosResponse> => {
    const queryParam: SectionQuery = {
      projectId: parseInt(projectId),
      name: sectionName,
    };
    const sectionResponse = await SectionService.getSection(queryParam);
    return sectionResponse;
  };

  const handleNext = async () => {
    setLoading(true);
    const project = getProjectFromLocalStorage();
    if (project !== null) {
      let sectionResponse;
      if (checked) {
        sectionResponse = await createNewSection(project.id);
      } else {
        sectionResponse = await getSection(project.id);
      }
      if (sectionResponse.status === OK) {
        const sectionId = sectionResponse.data.id;
        localStorage.setItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE, sectionId);
        navigate(`${AUTH_ROUTES.CASES}${AUTH_ROUTES.COPY}`);
      } else {
        setError(true);
        setHelperText(sectionResponse.data.error);
      };
    } else {
      navigate(AUTH_ROUTES.SETTINGS);
    }
    setLoading(false);
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
      <Grid item className="form-item">
        <FormControlLabel control={
          <Checkbox
            checked={checked}
            onChange={() => setChecked(!checked)}
            inputProps={{ "aria-label": "controlled" }}
            color="success"
          />} label="Create new section" />
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
