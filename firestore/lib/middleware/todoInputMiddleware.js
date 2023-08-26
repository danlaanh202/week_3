"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = todoInputMiddleware;
const yup = require("yup");
async function todoInputMiddleware(ctx, next) {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
      id: yup.string(),
      text: yup.string().required(),
      isCompleted: yup.boolean().required()
    });
    await schema.validate(postData);
    return next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name
    };
  }
}
//# sourceMappingURL=todoInputMiddleware.js.map