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
    message.message === "redirect" &&
    message.additional !== undefined) {
    try {
      window.location.href = message.additional;
      // const addKeyButton = document.querySelector("#addToken a") as HTMLElement | null;
      // addKeyButton?.click();
      // document.querySelector("#userTokenName")?.setAttribute("value", "ChromeExtension");
      // const generateKeyButton = document.querySelector("#userTokenGenerate") as HTMLElement | null;
      // generateKeyButton?.click();
      // const tokenField = document.querySelector("#userTokenCode strong");
      // response(tokenField?.textContent);
      // const confirmCreationButton = document.querySelector("#userTokenAdd") as HTMLElement | null;
      // confirmCreationButton?.click();
      response("success");
    } catch (err) {
      response(`Error: ${err}`);
    }
  } else if (sender.id === chrome.runtime.id &&
  message.from === Sender.React &&
  message.message === "click" &&
  message.additional !== undefined) {
    try {
      const authTab = document.querySelector(message.additional) as HTMLElement | null;
      authTab?.click();
      response("success");
    } catch (err) {
      response(`Error: ${err}`);
    }
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
