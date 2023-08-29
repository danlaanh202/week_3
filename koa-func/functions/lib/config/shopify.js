"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("dotenv/config");
var _shopifyApiNode = _interopRequireDefault(require("shopify-api-node"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = new _shopifyApiNode.default({
  shopName: "AvadaTrainingDan",
  accessToken: process.env.API_ACCESS_TOKEN
});
exports.default = _default;
//# sourceMappingURL=shopify.js.map