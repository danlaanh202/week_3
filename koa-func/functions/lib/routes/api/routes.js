"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;
var _koaRouter = _interopRequireDefault(require("koa-router"));
var todoController = _interopRequireWildcard(
  require("../../handlers/api/controllers/todoController")
);
var productController = _interopRequireWildcard(
  require("../../handlers/api/controllers/productController")
);
var _todoInputMiddleware = _interopRequireDefault(
  require("../../middleware/todoInputMiddleware")
);
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const router = new _koaRouter.default({
  prefix: "/api",
});
// ========================== Todo ============================
router.get("/todos", todoController.getTodos);
router.post("/todo", _todoInputMiddleware.default, todoController.createTd);
router.put("/todo/:id", todoController.toggle);
router.put("/todos", todoController.completeMultiple);
router.delete("/todo/:id", todoController.remove);
router.delete("/todos", todoController.removeMultiple);
// ========================== Product shopify ============================
router.get("/products", productController.getProducts);
router.post("/product", productController.create);
var _default = router;
exports.default = _default;
//# sourceMappingURL=routes.js.map
