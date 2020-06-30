// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import { NativeModules } from "react-native";

/**
 * Checks if the user has granted the appropriate permissions to be able to send and receive messages.
 * Returns true if permission is granted, false otherwise.
 * @returns {Promise.<boolean>}
 */
export async function HasNotificationPermission(): Promise<boolean> {
    // BEGIN USER CODE
    // Documentation https://rnfirebase.io/docs/v5.x.x/notifications/receiving-notifications

    if (NativeModules && !NativeModules.RNFBMessagingModule) {
        return Promise.reject(new Error("Firebase module is not available in your app"));
    }

    return NativeModules.RNFBMessagingModule.hasPermission().then((authStatus: number) => {
        if (authStatus) {
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    });

    // END USER CODE
}