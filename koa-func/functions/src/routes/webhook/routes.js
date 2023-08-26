import Router from "koa-router";

const router = new Router({
  prefix: "/webhook",
});

router.post("/cart/new", (ctx) => {
  console.log(ctx.req.body);
});
export default router;
