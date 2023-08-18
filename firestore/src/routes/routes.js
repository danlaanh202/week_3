import Router from "koa-router";
import * as todoHandler from "../handlers/todoHandlers";
import todoInputMiddleware from "../middleware/todoInputMiddleware";

// Prefix all routes with /books
const router = new Router({
  prefix: "/api",
});

// Routes will go here

router.get("/todoes", todoHandler.getTodoes);
router.post("/todo", todoInputMiddleware, todoHandler.createTd);
router.put("/todo", todoHandler.toggle);
router.put("/todoes", todoHandler.completeMultiple);
router.delete("/todo/:id", todoHandler.remove);
router.post("/todoes", todoHandler.removeMultiple);
// router.delele("/todoes", todoHandler.removeMultiple) //http://localhost:5000/todoes?ids=a&ids=b&...

export default router;
