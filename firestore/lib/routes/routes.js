"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _koaRouter = _interopRequireDefault(require("koa-router"));
var todoHandler = _interopRequireWildcard(require("../handlers/todoHandlers"));
var _todoInputMiddleware = _interopRequireDefault(require("../middleware/todoInputMiddleware"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = new _koaRouter.default({
  prefix: "/api"
});
router.get("/todos", todoHandler.getTodos);
router.post("/todo", _todoInputMiddleware.default, todoHandler.createTd);
router.put("/todo/:id", todoHandler.toggle);
router.put("/todos", todoHandler.completeMultiple);
router.delete("/todo/:id", todoHandler.remove);
router.delete("/todos", todoHandler.removeMultiple);
// router.delele("/todos", todoHandler.removeMultiple) //http://localhost:5000/todos?ids=a&ids=b&...
var _default = router;
exports.default = _default;
//# sourceMappingURL=routes.js.map