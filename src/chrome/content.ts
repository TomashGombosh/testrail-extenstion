import { ChromeMessage, Sender } from "../types/chrome";

const messagesFromReactAppListener = (message: ChromeMessage, sender: any, response:any) => {
  console.log("[content.js]. Message received", {
    message,
    sender,
  });
  if (
    sender.id === chrome.runtime.id &&
         message.from === Sender.React &&
         message.message === "get_selected") {
    const firstMatchList = document.querySelectorAll(".oddSelected");
    const secondMatchList = document.querySelectorAll(".evenSelected");
    const list = Array.from(firstMatchList).map((el) => el.id.replaceAll(/^row-/g, "C"));
    const finalList = list.concat(Array.from(secondMatchList).map((el) => el.id.replaceAll(/^row-/g, "C")));
    response(finalList.join(","));
  } else if (sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === "get_url") {
    response(window.location.href);
  } else if (sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === "get_token") {

  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
