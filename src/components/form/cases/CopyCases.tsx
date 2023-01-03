import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ChromeMessage, Sender } from "../../../types/chrome";
import Loader from "../../loader/Loader";
import SmallButton from "../../button/SmallButton";
import Form from "../core/Form";
import { AUTH_ROUTES, TEST_RAIL_CASES_IDS_ATTRIBUTE } from "../../../constants";
import autoGenerate from "../../autoGenerate/AutoGenerate";
import { STATE_ROUTE_ATTRIBUTE } from "../../../constants/index";

const CopyCases = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [casesIds, setCasesIds] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("This field is required");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    localStorage.setItem(STATE_ROUTE_ATTRIBUTE, `${AUTH_ROUTES.CASES}${AUTH_ROUTES.COPY}`);
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

  const handleResponseFromChrome = (response: string) => {
    if (response === "") {
      setError(true);
      setHelperText("No test cases selected in the testrail. Please check the boxes");
    } else {
      const caseIdsText = casesIds === "" ? casesIds : `${casesIds},`;
      setCasesIds(`${caseIdsText}${response}`);
      localStorage.setItem(TEST_RAIL_CASES_IDS_ATTRIBUTE, `${caseIdsText}${response}`);
    }
  };

  const handleGetFromTestRail = () => {
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
          data-testid="cases-ids"
        />
      </Grid>
      <Grid item className="form-item" style={{width: "100%"}} id="buttons">
        <SmallButton handleClick={() => navigate(`${AUTH_ROUTES.CASES}${AUTH_ROUTES.SECTIONS}`)} text="Back"/>
        <SmallButton handleClick={() => navigate(`${AUTH_ROUTES.CASES}${AUTH_ROUTES.REFERENCES}`)} text="Next" disabled={casesIds === ""}/>
      </Grid>
    </>;

  return (
    <Form header="Select cases to copy" content={content} />
  );
};

export default CopyCases;
