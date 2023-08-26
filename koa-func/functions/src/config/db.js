const serviceAccount = require("./serviceAccount.json");
import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
export default db;
