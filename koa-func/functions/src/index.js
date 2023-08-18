import { onRequest } from "firebase-functions/v2/https";
import apiHandler from "./app";

const api = onRequest(apiHandler.callback());

export { api };
