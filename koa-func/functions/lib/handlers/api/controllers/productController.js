"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getProducts = getProducts;
var _productRepositories = require("../../../repositories/productRepositories");
async function getProducts(ctx) {
  try {
    const products = await (0, _productRepositories.getAllProducts)();
    ctx.status = 200;
    return ctx.body = {
      data: products,
      success: true
    };
  } catch (error) {
    ctx.status = 500;
    return ctx.body = {
      success: false,
      data: [],
      error: e.message
    };
  }
}
async function create(ctx) {
  try {
    const product = await (0, _productRepositories.createProduct)(ctx.req.body);
    ctx.status = 201;
    return ctx.body = {
      data: product,
      success: true
    };
  } catch (error) {
    ctx.status = 500;
    return ctx.body = {
      success: false,
      error: error.message
    };
  }
}
//# sourceMappingURL=productController.js.map