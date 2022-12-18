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
import { CreateSectionRequest, UpdateTestCasesRequest } from "../../../types/requests";
import SectionService from "../../../service/api/SectionService";
import { OK } from "../../../constants/statusCodes";
import CasesService from "../../../service/api/CasesService";

const CreateSectionCases = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [references, setRefrences] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [helperText] = useState<string>("This field is required");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
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
    const projectId = localStorage.getItem(TEST_RAIL_PROJECT_ATTRIBUTE);
    const sectionName = localStorage.getItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE);
    const casesIds = localStorage.getItem(TEST_RAIL_CASES_IDS_ATTRIBUTE)?.replaceAll(/C/g, "").split(",") || [];

    if (projectId === null) {
      navigate(`${AUTH_ROUTES.SETTINGS}`);
    } else {
      const createSectionRequest: CreateSectionRequest = {
        projectId: parseInt(projectId),
        name: sectionName || "",
        description: sectionName || "",
      };
      const sectionResponse = await SectionService.createSection(createSectionRequest);
      if (sectionResponse.status === OK) {
        const sectionId = sectionResponse.data.id;
        const request: UpdateTestCasesRequest = {
          projectId,
          sectionId,
          casesIds: casesIds,
          references: references || "",
        };
        const casesResponse = await CasesService.copyTestCases(request);
        if (casesResponse.status === OK) {
          navigate(AUTH_ROUTES.DASHBOARD);
          localStorage.removeItem(TEST_RAIL_CASES_IDS_ATTRIBUTE);
          localStorage.removeItem(TEST_RAIL_SECTION_NAME_ATTRIBUTE);
          localStorage.removeItem(TEST_RAIL_REFERENCES_ATTRIBUTE);
        }
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
