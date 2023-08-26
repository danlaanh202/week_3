import Koa from "koa";
import cors from "@koa/cors";
import routes from "../../routes/api/routes.js";
const app = new Koa();
app.use(cors());
app.use(routes.routes());
app.use(routes.allowedMethods());

export default app;
