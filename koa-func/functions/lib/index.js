"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = void 0;
var _https = require("firebase-functions/v2/https");
var _app = _interopRequireDefault(require("./app"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const api = (0, _https.onRequest)(_app.default.callback());
exports.api = api;
//# sourceMappingURL=index.js.map