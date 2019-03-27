// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import InAppBrowserType, { InAppBrowserOptions } from "react-native-inappbrowser-reborn";

/**
 * @param {string} url - This field is required.
 * @param {string} toolbarColor - An optional custom background color for the browser toolbar. For example: 'red' or '#6200EE'.
 * @param {"NativeMobileActions.InAppBrowserDismissButtonStyle.done"|"NativeMobileActions.InAppBrowserDismissButtonStyle.close"|"NativeMobileActions.InAppBrowserDismissButtonStyle.cancel"} iosDismissButtonStyle - iOS only setting. The text that should be used for the button that closes the in app browser. Set to empty to use default value 'close'.
 * @param {boolean} androidShowTitle - Android only setting. Set to true to show the title of the web page in the toolbar.
 * @returns {boolean}
 */
function OpenInAppBrowser(
    url?: string,
    toolbarColor?: string,
    iosDismissButtonStyle?: "done" | "close" | "cancel",
    androidShowTitle?: boolean
): Promise<boolean> {
    // BEGIN USER CODE
    // Documentation https://github.com/proyecto26/react-native-inappbrowser

    const InAppBrowser: typeof InAppBrowserType = require("react-native-inappbrowser-reborn").default;

    if (!url) {
        throw new TypeError("Input parameter 'Url' is required");
    }

    const options: InAppBrowserOptions = {
        toolbarColor,
        preferredBarTintColor: toolbarColor,
        dismissButtonStyle: iosDismissButtonStyle,
        showTitle: androidShowTitle
    };

    return InAppBrowser.open(url, options).then(() => true);

    // END USER CODE
}
