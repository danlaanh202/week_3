import Router from "koa-router";
import * as todoHandler from "../handlers/todoHandlers";
import todoInputMiddleware from "../middleware/todoInputMiddleware";

const router = new Router({
  prefix: "/api",
});

router.get("/todos", todoHandler.getTodos);
router.post("/todo", todoInputMiddleware, todoHandler.createTd);
router.put("/todo/:id", todoHandler.toggle);
router.put("/todos", todoHandler.completeMultiple);
router.delete("/todo/:id", todoHandler.remove);
router.delete("/todos", todoHandler.removeMultiple);
// router.delele("/todos", todoHandler.removeMultiple) //http://localhost:5000/todos?ids=a&ids=b&...

export default router;
