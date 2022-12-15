import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ChromeMessage, Sender } from "../../../types/chrome";
import Loader from "../../loader/Loader";
import Button from "../../button/Button";
import SmallButton from "../../button/SmallButton";
import Form from "../core/Form";
import { AUTH_ROUTES, TEST_RAIL_CASES_IDS_ATTRIBUTE } from "../../../constants";
import CasesService from "../../../service/api/CasesService";
import { MergeTestCasesRequest } from "../../../types/requests";
import { OK } from "../../../constants/statusCodes";
import ErrorForm from "../core/ErrorForm";

const CopyCases = () => {
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
    localStorage.setItem(TEST_RAIL_CASES_IDS_ATTRIBUTE, value.replace(/ /g, ","));
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
      console.log(tabs);
      const currentTabId = tabs[0].id !== undefined ? tabs[0].id : 1;
      chrome.tabs.sendMessage(
        currentTabId,
        message,
        (response) => {
          if (response === "") {
            setError(true);
            setHelperText("No test cases selected in the testrail");
          } else {
            setCasesIds(`${casesIds},${response}`);
          }
        }
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
        />
      </Grid>
      <Grid item className="form-item">
        <Button handleClick={handleGetFromTestRail} text="Get from testrail"/>
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

export default CopyCases;
