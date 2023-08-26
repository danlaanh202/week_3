import * as functions from "firebase-functions";
import apiHandler from "./handlers/api";
import webhookHandler from "./handlers/webhook";
const api = functions.https.onRequest(apiHandler.callback());
const webhook = functions.https.onRequest(webhookHandler.callback());
// const myStorageFunction = functions.region("us-central1").storage.object();
export { api, webhook };
