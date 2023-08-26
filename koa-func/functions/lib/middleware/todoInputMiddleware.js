"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = todoInputMiddleware;
var yup = _interopRequireWildcard(require("yup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
async function todoInputMiddleware(ctx, next) {
  try {
    const postData = ctx.req.body;
    let schema = yup.object().shape({
      id: yup.string(),
      text: yup.string().required(),
      isCompleted: yup.boolean().required()
    });
    await schema.validate(postData);
    return next();
  } catch (e) {
    ctx.status = 400;
    return ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name
    };
  }
}
//# sourceMappingURL=todoInputMiddleware.js.map