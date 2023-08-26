"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProduct = createProduct;
exports.getAllProducts = getAllProducts;
var _shopify = _interopRequireDefault(require("../config/shopify"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function getAllProducts() {
  const products = await _shopify.default.product.list();
  return products;
}
async function createProduct(data) {
  const product = await _shopify.default.product.create(data);
  return product;
}
//# sourceMappingURL=productRepositories.js.map