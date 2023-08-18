import Koa from "koa";
import koaBody from "koa-body";
import routes from "./routes/routes.js";
import cors from "@koa/cors";
const app = new Koa();
app.use(cors());
app.use(koaBody());
app.use(async (ctx) => {
  ctx.body = "Hello World";
});

// app.use(routes.routes());
app.use(routes.allowedMethods());

export default app;
