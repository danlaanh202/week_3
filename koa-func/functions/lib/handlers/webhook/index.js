"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _koa = _interopRequireDefault(require("koa"));
var _cors = _interopRequireDefault(require("@koa/cors"));
var _routes = _interopRequireDefault(require("../../routes/webhook/routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = new _koa.default();
app.use((0, _cors.default)());
app.use(_routes.default.routes());
app.use(_routes.default.allowedMethods());
var _default = app;
exports.default = _default;
//# sourceMappingURL=index.js.map