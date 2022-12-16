import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import IconButton from "@mui/material/IconButton";
import SmallButton from "../../button/SmallButton";
import { StoreUserTestRailDataRequest } from "../../../types/requests";
import UserService from "../../../service/api/UserService";
import { AUTH_ROUTES, OK, STATE_ROUTE_ATTRIBUTE } from "../../../constants";
import Loader from "../../loader/Loader";
import Form from "../core/Form";

const TokenForm = () => {
  const [isLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string|undefined>("");
  const [url, setUrl] = useState<string|undefined>("");
  const [urlError, setUrlError] = useState<boolean>(false);
  const [tokenError, setTokenError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(STATE_ROUTE_ATTRIBUTE, `${AUTH_ROUTES.SETTINGS}${AUTH_ROUTES.TOKEN}`);
  }, []);

  const handleClick = async () => {
    if (url !== undefined && token !== undefined) {
      const request: StoreUserTestRailDataRequest = {
        url,
        apiKey: token,
      };
      const response = await UserService.updateTestRailData(request);
      if (response.status === OK) {
        navigate(AUTH_ROUTES.DASHBOARD);
      }
    }
  };

  const getTestRailUrl = () => {
    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };
    chrome.tabs && chrome.tabs.query(queryInfo, (tabs) => {
      const url = tabs[0].url;
      if (url === "" &&
        url.match(/\.testrail\..*\/index.php\?/g) === null &&
        url === undefined) {
        setUrlError(true);
        setHelperText("Incorrect url opened now. Please open test rail url");
      } else {
        setUrl(url?.match(/(^https:\/\/).*(?=\/index.php)/g)?.join(""));
      }
    });
  };

  const getTestRailToken = () => {
    chrome.tabs.update({
      url: `${url}/index.php?/mysettings`,
    });
    setHelperText("Please generate new API key in the API keys tab and put it in the field. This field is requried");
  };

  const handleFillUrl = (e: any) => {
    const value = e.target.value;
    if (value === "") {
      setUrlError(true);
      setHelperText("Please fill required field");
    } else {
      setUrlError(false);
    }
    setUrl(value);
  };

  const handleFillToken = (e: any) => {
    const value = e.target.value;
    if (value === "") {
      setTokenError(true);
    } else {
      setTokenError(false);
    }
    setToken(value);
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
        onChange={(e) => handleFillUrl(e)}
        value={url}
        error={urlError}
        helperText={urlError ? helperText : ""}
        size="small"
        InputProps={getAutomatically(getTestRailUrl, "top-end", false)} />),
    },
    {
      element: (<TextField
        type="password"
        placeholder="API key"
        onChange={(e) => handleFillToken(e)}
        value={token}
        error={tokenError}
        helperText={helperText}
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
      <SmallButton handleClick={() => navigate(AUTH_ROUTES.SETTINGS)} text="Back"/>
      <SmallButton handleClick={handleClick} text="Add" disabled={token === "" || url === ""}/>
    </Grid>
    </>);
  return (<Form header="Store you token" content={content} />);
};

export default TokenForm;
