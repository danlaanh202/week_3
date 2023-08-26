"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _koaRouter = _interopRequireDefault(require("koa-router"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = new _koaRouter.default({
  prefix: "/webhook"
});
router.post("/cart/new", ctx => {
  console.log(ctx.req.body);
});
var _default = router;
exports.default = _default;
//# sourceMappingURL=routes.js.map