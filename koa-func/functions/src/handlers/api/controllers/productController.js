import {
  createProduct,
  getAllProducts,
} from "../../../repositories/productRepositories";
export async function getProducts(ctx) {
  try {
    const products = await getAllProducts();
    ctx.status = 200;
    return (ctx.body = {
      data: products,
      success: true,
    });
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      data: [],
      error: e.message,
    });
  }
}

export async function create(ctx) {
  try {
    const product = await createProduct(ctx.req.body);
    ctx.status = 201;
    return (ctx.body = {
      data: product,
      success: true,
    });
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}
