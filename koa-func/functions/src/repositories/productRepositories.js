import shopify from "../config/shopify";
export async function getAllProducts() {
  const products = await shopify.product.list();
  return products;
}
export async function createProduct(data) {
  const product = await shopify.product.create(data);
  return product;
}
