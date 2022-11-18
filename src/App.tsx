import React, { useEffect, useState } from 'react';
import './App.css';
import { ChromeMessage, Sender } from "./types";

const App = () => {
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
    <div>
      <h3>Welcome to the Test rail support application</h3>
      <div>
        <button onClick={redirect}>Click me</button>
        {/* <span>{responseFromContent}</span> */}
      </div>
    </div>

  );
}

export default App;
