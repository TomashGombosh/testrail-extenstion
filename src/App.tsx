import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import api from "./service/api/api";
import './App.css';
import { ChromeMessage, Sender } from "./types";
import { TEST_RAIL_TOKEN_ATTRIBUTE } from './constants';

const className = process.env.ENV === "PROD" ? "extension" : "browser debug";


const App = (props: any) => {

  useEffect(() => {

  }, [])

  const [responseFromContent, setResponseFromContent] = useState<string>('');

  const redirect = () => {
    const message: ChromeMessage = {
        from: Sender.React,
        message: "redirect",
    }
    const queryInfo: chrome.tabs.QueryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        const currentTabId = tabs[0]?.id; 
        if(currentTabId) {
        chrome.tabs.sendMessage(
            currentTabId,
            message,
            (response) => {
              setResponseFromContent(response);
            });
          }
    });
};

  return (
    <Grid container direction="row" alignItems="center" className={className}>
        {props.children}
    </Grid>

  );
}

export default App;
