import Router from "koa-router";
import * as todoHandler from "../handlers/todoHandlers";
import todoInputMiddleware from "../middleware/todoInputMiddleware";

const router = new Router({
  prefix: "/api",
});

router.get("/todo/:id", todoHandler.getTodo);
router.get("/todos", todoHandler.getTodos);
router.post("/todo", todoInputMiddleware, todoHandler.createTd);
router.put("/todos", todoHandler.updateMultiple);
router.put("/todo/:id", todoHandler.update);
router.delete("/todos", todoHandler.removeMultiple);
router.delete("/todo/:id", todoHandler.remove);

export default router;
