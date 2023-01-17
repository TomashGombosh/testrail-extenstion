import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ChromeMessage, Sender } from "../../../types/chrome";
import Loader from "../../loader/Loader";
import SmallButton from "../../button/SmallButton";
import Form from "../core/Form";
import { AUTH_ROUTES,
  STATE_ROUTE_ATTRIBUTE,
  TEST_RAIL_PROJECT_ATTRIBUTE,
} from "../../../constants";
import CasesService from "../../../service/api/CasesService";
import { MergeTestCasesRequest } from "../../../types/requests";
import { OK } from "../../../constants/statusCodes";
import autoGenerate from "../../autoGenerate/AutoGenerate";
import ConfirmForm from "../ConfirmForm";
import { Project } from "../../../types/testrail";

const MergeCases = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isShowConfirm, setShowConfirm] = useState<boolean>(false);
  const [casesIds, setCasesIds] = useState<string>("");
  const [sectionId, setSectionId] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("This field is required");
  const [mergeType, setMergeType] = React.useState<number>(0);
  const [showCase, setShowCases] = React.useState<boolean>(false);
  const [showSection, setShowSection] = React.useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    localStorage.setItem(STATE_ROUTE_ATTRIBUTE, `${AUTH_ROUTES.CASES}${AUTH_ROUTES.MERGE}`);
  }, []);

  const handleCasesId = (e: any) => {
    const value = e.target.value;
    if (value === "") {
      setError(true);
    } else {
      setError(false);
    }
    setCasesIds(value.replace(/ /g, ","));
  };

  const handleSectionId = (e: any) => {
    const value = e.target.value;
    if (value === "") {
      setError(true);
    } else {
      setError(false);
    }
    setSectionId(value.replace(/ /g, ","));
  };

  const handleResponseFromChrome = (response: string) => {
    if (response === "") {
      setError(true);
      setHelperText("No test cases selected in the testrail. Please check the boxes");
    } else {
      if (showCase) {
        const caseIdsText = casesIds === "" ? casesIds : `${casesIds},`;
        setCasesIds(`${caseIdsText}${response}`);
        return;
      }
      if (showSection) {
        setSectionId(response);
        return;
      }
    }
  };

  const handleChange = (event: any) => {
    const value = event.target.value;
    setMergeType(value);
    // eslint-disable-next-line no-magic-numbers
    setShowCases(value === 10);
    // eslint-disable-next-line no-magic-numbers
    setShowSection(value === 20);
    setCasesIds("");
    setSectionId("");
  };

  const handleGetFromTestRailCasesId = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "get_selected_cases",
    };
    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };
    chrome.tabs && chrome.tabs.query(queryInfo, (tabs) => {
      const currentTabId = tabs[0].id !== undefined ? tabs[0].id : 1;
      chrome.tabs.sendMessage(
        currentTabId,
        message,
        (response) => handleResponseFromChrome(response)
      );
    });
  };

  const handleGetFromTestRailSectionId = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "get_selected_section",
    };
    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };
    chrome.tabs && chrome.tabs.query(queryInfo, (tabs) => {
      const currentTabId = tabs[0].id !== undefined ? tabs[0].id : 1;
      chrome.tabs.sendMessage(
        currentTabId,
        message,
        (response) => handleResponseFromChrome(response)
      );
    });
  };

  const handleConfirmBack = () => {
    setShowConfirm(false);
  };

  const handleConfirm = () => {
    setShowConfirm(true);
  };

  const getProjectFromLocalStorage = (): Project|undefined => {
    const project = localStorage.getItem(TEST_RAIL_PROJECT_ATTRIBUTE);
    return project !== null
      ? JSON.parse(project) as Project
      : undefined;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const casesIdsArray = casesIds.replaceAll(/C/g, "").split(",") || [];
    const project = getProjectFromLocalStorage();
    const request: MergeTestCasesRequest = casesIds.length > 0
      ? { casesIds: casesIdsArray }
      : { sectionId: sectionId, projectId: project?.id };
    const casesResponse = await CasesService.mergeTestCases(request);
    if (casesResponse.status === OK) {
      localStorage.removeItem(STATE_ROUTE_ATTRIBUTE);
      navigate(`${AUTH_ROUTES.CASES}${AUTH_ROUTES.MERGE}${AUTH_ROUTES.RESULTS}`, {state: casesResponse.data});
    } else {
      setLoading(false);
    }
  };

  const handleBack = () => {
    localStorage.removeItem(STATE_ROUTE_ATTRIBUTE);
    navigate(AUTH_ROUTES.ME);
  };

  const confirmContent = <Grid container direction="row">
    <Grid item className="form-item">
      Please confirm cases merge.
    </Grid>
    {casesIds.length > 0 && (casesIds.split(",").map((c) => (
      <Grid className="form-item" key={c.replaceAll(/C/g, "")}>Case {c} merge to the original case</Grid>
    )))}
    {sectionId !== "" && (
      <Grid className="form-item">Cases from section with Id:{sectionId} merge to the original cases</Grid>
    )}
  </Grid>;

  const content = <>
    <Grid item className="form-item full-width">
      <FormControl fullWidth>
        <InputLabel id="merge-type">Select type</InputLabel>
        <Select
          labelId="select-label"
          id="select-type-of-merge"
          value={mergeType}
          label="Merge type"
          onChange={handleChange}
          data-testid="select-type-of-merge"
        >
          <MenuItem value={0}>None</MenuItem>
          <MenuItem value={10}>Case</MenuItem>
          <MenuItem value={20}>Section</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    {showCase && <Grid item className="form-item">
      <TextField
        placeholder="Cases ids"
        onChange={(e) => handleCasesId(e)}
        value={casesIds}
        size="small"
        error={error}
        helperText={error ? helperText : ""}
        InputProps={autoGenerate(handleGetFromTestRailCasesId, "bottom-end", false)}
        data-testid="merge-cases-ids"
      />
    </Grid>}
    {showSection && <Grid item className="form-item">
      <TextField
        placeholder="Section id"
        onChange={(e) => handleSectionId(e)}
        value={sectionId}
        size="small"
        error={error}
        helperText={error ? helperText : ""}
        InputProps={autoGenerate(handleGetFromTestRailSectionId, "bottom-end", false)}
        data-testid="merge-section-id"
      />
    </Grid>}
    <Grid item className="form-item" style={{width: "100%"}} id="buttons">
      <SmallButton handleClick={handleBack} text="Back"/>
      <SmallButton handleClick={handleConfirm} text="Merge" disabled={casesIds === "" && sectionId === ""}/>
    </Grid>
  </>;

  const form = isShowConfirm
    ? <ConfirmForm
      header="Confirm merge"
      confirmationContent={confirmContent}
      confirmFunction={handleSubmit}
      backFunction={handleConfirmBack}
    />
    : <Form header="Select cases to merge" content={content} />;

  return isLoading
    ? <Loader/>
    : form;
};

export default MergeCases;
