// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import ReactNativeFirebase from "react-native-firebase";

/**
 * @param {Big} badgeNumber - This field is required. Should be greater than or equal to 0.
 * @returns {boolean}
 */
function SetBadgeNumber(badgeNumber?: BigJs.Big): boolean {
    // BEGIN USER CODE
    // Documentation https://rnfirebase.io/docs/v5.x.x/notifications/reference/Notifications#setBadge

    const firebase: typeof ReactNativeFirebase = require("react-native-firebase");

    if (!badgeNumber) {
        throw new TypeError("Input parameter 'Badge number' is required");
    }

    if (badgeNumber.lt(0)) {
        throw new TypeError("Input parameter 'Badge number' should be zero or greater");
    }

    firebase.notifications().setBadge(Number(badgeNumber));
    return true;

    // END USER CODE
}
