import { ChromeMessage, Sender } from "../types/chrome";

const messagesFromReactAppListener = (message: ChromeMessage, sender: any, response:any) => {
  console.log("[content.js]. Message received", {
    message,
    sender,
  });
  if (
    sender.id === chrome.runtime.id &&
         message.from === Sender.React &&
         message.message === "get_selected_cases") {
    const finalList = handleTestCaseIds();
    response(finalList.join(","));
  } else if (
    sender.id === chrome.runtime.id &&
         message.from === Sender.React &&
         message.message === "get_selected_section") {
    const id = handleSectionId();
    response(id?.join(""));
  } else if (sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === "redirect" &&
    message.additional !== undefined) {
    window.location.href = message.additional;
  } else if (
    sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === "click" &&
    message.additional !== undefined
  ) {
    handleClick(message.additional);
    response("Success");
  } else if (
    sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === "fill" &&
    message.additional !== undefined
  ) {
    fillInputField(message.additional.selector, message.additional.value);
    response("Success");
  } else if (
    sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === "get_text" &&
    message.additional !== undefined
  ) {
    const text = getText(message.additional);
    response(text);
  }
};

const handleClick = (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement;
  element.click();
};

const fillInputField = (selector: string, value: string) => {
  if (document.querySelector(selector) !== null) {
    // @ts-ignore
    document.querySelector(selector).value = value;
  }
};

const handleTestCaseIds = () => {
  const firstMatchList = document.querySelectorAll(".oddSelected");
  const secondMatchList = document.querySelectorAll(".evenSelected");
  const list = Array.from(firstMatchList).map((el) => el.id.replaceAll(/^row-/g, "C"));
  const finalList = list.concat(Array.from(secondMatchList).map((el) => el.id.replaceAll(/^row-/g, "C")));
  return finalList;
};

const handleSectionId = () => {
  const section = document.querySelector("[class*=jstree-clicked]>span");
  return section?.getAttribute("id")?.match(/[\d]/g);
};

const getText = (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement;
  return element.textContent;
};

chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
