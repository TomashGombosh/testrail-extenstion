import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import IconButton from "@mui/material/IconButton";
import SmallButton from "../../button/SmallButton";
import { StoreUserTestRailDataRequest } from "../../../types/requests";
import UserService from "../../../service/api/UserService";
import { AUTH_ROUTES, OK } from "../../../constants";
import Loader from "../../loader/Loader";
import Form from "../core/Form";
import { ChromeMessage, Sender } from "../../../types/chrome";

const TokenForm = () => {
  const [isLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");
  const navigate = useNavigate();

  const handleClick = async () => {
    const request: StoreUserTestRailDataRequest = {
      url,
      apiKey: token,
    };
    const response = await UserService.updateTestRailData(request);
    if (response.status === OK) {
      navigate(AUTH_ROUTES.DASHBOARD);
    }
  };

  const getTestRailUrl = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "get_url",
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
            setHelperText("Incorrect url opened now");
          } else {
            setUrl(response);
          }
        }
      );
    });
  };

  const getTestRailToken = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "get_token",
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
            setHelperText("Incorrect url");
          } else {
            setUrl(response);
          }
        }
      );
    });
  };

  const getAutomatically = (onClickFunction: any,
    placement: TooltipProps["placement"],
    disabled: boolean) => ({
    endAdornment: (
      <Tooltip
        title="Generate value automatically"
        arrow
        placement={placement}
        disableHoverListener={disabled}
        disableFocusListener={disabled}
      ><IconButton onClick={onClickFunction} disabled={disabled}>
          <AutoFixHighIcon />
        </IconButton>
      </Tooltip>),
  });

  const fields = [
    {
      element: (<TextField
        type="text"
        placeholder="Url"
        onChange={(e) => setUrl(e.target.value)}
        value={token}
        error={error}
        helperText={error ? helperText : ""}
        size="small"
        InputProps={getAutomatically(getTestRailUrl, "top-end", false)} />),
    },
    {
      element: (<TextField
        type="password"
        placeholder="Token"
        onChange={(e) => setToken(e.target.value)}
        value={url}
        error={error}
        helperText={error ? helperText : ""}
        disabled={url === ""}
        size="small"
        InputProps={getAutomatically(getTestRailToken, "bottom-end", url === "")} />),
    },
  ];

  const content = isLoading
    ? <Loader />
    : (<>{fields.map((el, index) => (
      <Grid item key={index} className="form-item">
        {el.element}
      </Grid>))}
    <Grid item className="form-item" style={{width: "100%"}} id="buttons">
      <SmallButton handleClick={() => navigate(`${AUTH_ROUTES.CASES}${AUTH_ROUTES.COPY}`)} text="Back"/>
      <SmallButton handleClick={handleClick} text="Add" disabled={token === "" || url === ""}/>
    </Grid>
    </>);
  return (<Form header="Store you token" content={content} />);
};

export default TokenForm;
