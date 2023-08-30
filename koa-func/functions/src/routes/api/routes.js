import Router from "koa-router";
import * as todoController from "../../handlers/api/controllers/todoController";
import * as productController from "../../handlers/api/controllers/productController";
import todoInputMiddleware from "../../middleware/todoInputMiddleware";
import axios from "axios";
const router = new Router({
  prefix: "/api",
});
// ========================== Todo ============================
router.get("/todo/:id", todoController.getOne);
router.get("/todos", todoController.getMany);
router.post("/todo", todoInputMiddleware, todoController.createTd);
router.put("/todos", todoController.updateMultiple);
router.put("/todo/:id", todoController.update);
router.delete("/todos", todoController.removeMultiple);
router.delete("/todo/:id", todoController.remove);

// ========================== Product shopify ============================
router.get("/products", productController.getProducts);
router.post("/product", productController.create);

router.get("/test", async (ctx) => {
  try {
    const { data } = await axios.get(
      "https://avadatrainingdan.myshopify.com/admin/api/2023-07/products.json",
      {
        headers: {
          ["X-Shopify-Access-Token"]: "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",
        },
      }
    );

    ctx.status = 200;
    return (ctx.body = {
      data: data.products,
      success: true,
    });
  } catch (error) {
    return (ctx.body = {
      error: error,
    });
  }
});

export default router;
