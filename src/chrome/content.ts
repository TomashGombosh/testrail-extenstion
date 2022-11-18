import { MY_SETTINGS, TEST_RAIL_URL, USER_DROP_DOWN } from "../constants";
import { ChromeMessage, Sender } from "../types";

const messagesFromReactAppListener = (message: ChromeMessage, sender: any, response:any) => {
        window.location.href = "https://idealscorp.testrail.io/index.php?/mysettings";
        let existCondition = setInterval(function() {
            if (document.getElementById('navigation-user')) {
               clearInterval(existCondition);
               document.getElementById("navigation-user")?.click();
            }
           }, 100);
        let existCondition2 = setInterval(function() {
            if (document.getElementById('navigation-user-settings')) {
               clearInterval(existCondition);
               document.getElementById("navigation-user-settings")?.click();
            }
        }, 100);
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);