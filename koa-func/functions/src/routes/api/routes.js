import Router from "koa-router";
import * as todoController from "../../handlers/api/controllers/todoController";
import * as productController from "../../handlers/api/controllers/productController";
import todoInputMiddleware from "../../middleware/todoInputMiddleware";

const router = new Router({
  prefix: "/api",
});
// ========================== Todo ============================
router.get("/todos", todoController.getTodos);
router.post("/todo", todoInputMiddleware, todoController.createTd);
router.put("/todo/:id", todoController.toggle);
router.put("/todos", todoController.completeMultiple);
router.delete("/todo/:id", todoController.remove);
router.delete("/todos", todoController.removeMultiple);
// ========================== Product shopify ============================
router.get("/products", productController.getProducts);
router.post("/product", productController.create);
export default router;
