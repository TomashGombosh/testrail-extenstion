import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SmallButton from "../../button/SmallButton";
import { StoreUserTestRailDataRequest } from "../../../types/requests";
import UserService from "../../../service/api/UserService";
import { AUTH_ROUTES, OK } from "../../../constants";
import Loader from "../../loader/Loader";
import Form from "../core/Form";
import autoGenerate from "../../autoGenerate/AutoGenerate";
import { ChromeMessage, Sender } from "../../../types/chrome";

const TokenForm = () => {
  const [isLoading] = useState<boolean>(false);
  const [isSettingDisabled, setDisableSettings] = useState<boolean>(false);
  const [isGenerateTokenDisabled, setGenerateToken] = useState<boolean>(true);
  const [isCopyTokenDisabled, setCopyToken] = useState<boolean>(true);
  const [token, setToken] = useState<string|undefined>("");
  const [url, setUrl] = useState<string|undefined>("");
  const [urlError, setUrlError] = useState<boolean>(false);
  const [tokenError, setTokenError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");
  const [header, setHeader] = useState<string>("Store you token");
  const [isShowToken, setShowToken] = useState<boolean>(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.message) {
      setHeader(state.message);
    }
  });

  const handleClick = async () => {
    if (url !== undefined && token !== undefined) {
      const request: StoreUserTestRailDataRequest = {
        url,
        apiKey: token,
      };
      saveToken();
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

  const goToTheSettings = () => {
    chrome.tabs.update({
      url: `${url}/index.php?/mysettings`,
    });
    setHelperText("Please generate new API key in the API keys tab and put it in the field. This field is requried");
    setDisableSettings(true);
    setGenerateToken(false);
  };

  const openApiKeys = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "click",
      additional: "a[class*=tab4]",
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
        (response) => console.log(response)
      );
    });
  };

  const addKey = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "click",
      additional: "[id=addToken] a",
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
        (response) => console.log(response)
      );
    });
  };

  const fillTokenName = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "fill",
      additional: {
        selector: "[id=userTokenName]",
        value: "ChromeExtension",
      },
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
        (response) => console.log(response)
      );
    });
  };

  const clickGenerateKey = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "click",
      additional: "[id=userTokenGenerate]",
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
        (response) => console.log(response)
      );
    });
  };

  const getToken = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "get_text",
      additional: "[id=userTokenCode] strong",
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
        (response) => setToken(response)
      );
    });
  };

  const addToken = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "click",
      additional: "[id=userTokenAdd]",
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
        (response) => console.log(response)
      );
    });
  };

  const saveSettings = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "click",
      additional: "[id=accept]",
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
        (response) => setToken(response)
      );
    });
  };

  const showToken = () => ({
    endAdornment: (
      <Tooltip
        title="Show token"
        arrow
        placement="top-end"
      ><IconButton onClick={() => setShowToken(!isShowToken)}>
          {isShowToken ? (<Visibility />) : (<VisibilityOff/>)}
        </IconButton>
      </Tooltip>),
  });

  const handleAutoGenerate = () => {
    const stepTimeout = 1000;
    setTimeout(openApiKeys, stepTimeout);
    setTimeout(addKey, stepTimeout);
    setTimeout(fillTokenName, stepTimeout);
    setTimeout(clickGenerateKey, stepTimeout);
    setGenerateToken(true);
    setCopyToken(false);
  };

  const copyToken = () => {
    const stepTimeout = 1000;
    setTimeout(getToken, stepTimeout);
    setTimeout(addToken, stepTimeout);
    setCopyToken(true);
    setDisableSettings(false);
  };

  const saveToken = () => {
    const stepTimeout = 1000;
    setTimeout(saveSettings, stepTimeout);
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
        InputProps={autoGenerate(getTestRailUrl, "top-end", false)} />),
    },
    {
      element: (<TextField
        type={isShowToken ? "text" : "password"}
        placeholder="API key"
        onChange={(e) => handleFillToken(e)}
        value={token}
        error={tokenError}
        helperText={helperText}
        disabled={url === ""}
        size="small"
        InputProps={showToken()}/>),
    },
  ];

  const content = isLoading
    ? <Loader />
    : (<>{fields.map((el, index) => (
      <Grid item key={index} className="form-item">
        {el.element}
      </Grid>))}
    <Grid item className="form-item" style={{width: "100%"}} id="steps">
      <SmallButton text="Start" handleClick={goToTheSettings} disabled={isSettingDisabled}/>
      <SmallButton text="Generate" handleClick={handleAutoGenerate} disabled={isGenerateTokenDisabled}/>
      <SmallButton text="Copy" handleClick={copyToken} disabled={isCopyTokenDisabled}/>
    </Grid>
    <Grid item className="form-item" style={{width: "100%"}} id="buttons">
      <SmallButton handleClick={() => navigate(AUTH_ROUTES.SETTINGS)} text="Back"/>
      <SmallButton handleClick={handleClick} text="Add" disabled={(token === "" || url === "") && !isSettingDisabled}/>
    </Grid>
    </>);
  return (<Form header={header} content={content} />);
};

export default TokenForm;
