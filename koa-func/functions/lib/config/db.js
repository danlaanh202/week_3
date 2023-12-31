"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const serviceAccount = require("./serviceAccount.json");
_firebaseAdmin.default.initializeApp({
  credential: _firebaseAdmin.default.credential.cert(serviceAccount)
});
const db = _firebaseAdmin.default.firestore();
var _default = db;
exports.default = _default;
//# sourceMappingURL=db.js.map