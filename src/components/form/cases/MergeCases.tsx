import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ChromeMessage, Sender } from "../../../types/chrome";
import Loader from "../../loader/Loader";
import SmallButton from "../../button/SmallButton";
import Form from "../core/Form";
import { AUTH_ROUTES } from "../../../constants";
import CasesService from "../../../service/api/CasesService";
import { MergeTestCasesRequest } from "../../../types/requests";
import { OK } from "../../../constants/statusCodes";
import ErrorForm from "../core/ErrorForm";
import autoGenerate from "../../autoGenerate/AutoGenerate";

const MergeCases = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [casesIds, setCasesIds] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");
  const [helperText, setHelperText] = useState<string>("This field is required");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
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

  const handleResponseFromChrome = (response: string) => {
    if (response === "") {
      setError(true);
      setHelperText("No test cases selected in the testrail. Please check the boxes");
    } else {
      const caseIdsText = casesIds === "" ? casesIds : `${casesIds},`;
      setCasesIds(`${caseIdsText}${response}`);
    }
  };

  const handleGetFromTestRail = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "get_selected",
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

  const handleSubmit = async () => {
    setLoading(true);
    const casesIdsArray = casesIds.replaceAll(/C/g, "").split(",") || [];

    const request: MergeTestCasesRequest = {
      casesIds: casesIdsArray,
    };
    const casesResponse = await CasesService.mergeTestCases(request);
    if (casesResponse.status === OK) {
      navigate(AUTH_ROUTES.DASHBOARD);
    } else {
      setLoading(false);
      setApiError(casesResponse.data.error);
    }
  };

  const content = isLoading
    ? <Loader/>
    : <>
      <Grid item className="form-item">
        <TextField
          placeholder="Cases ids"
          onChange={(e) => handleCasesId(e)}
          value={casesIds}
          size="small"
          error={error}
          helperText={error ? helperText : ""}
          InputProps={autoGenerate(handleGetFromTestRail, "bottom-end", false)}
        />
      </Grid>
      <Grid item className="form-item" style={{width: "100%"}} id="buttons">
        <SmallButton handleClick={() => navigate(`${AUTH_ROUTES.CASES}${AUTH_ROUTES.COPY}`)} text="Back"/>
        <SmallButton handleClick={handleSubmit} text="Merge" disabled={casesIds === ""}/>
      </Grid>
    </>;
  return apiError !== ""
    ? <ErrorForm errorMessage={apiError}/>
    : <Form header="Select cases to merge" content={content} />;
};

export default MergeCases;
