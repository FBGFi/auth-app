import Koa from "koa";
import Router from "@koa/router";
import { prepareMiddleware } from "@fbgfi/middleware";
import { HTTPResponseError } from "@fbgfi/constants";
import { EndpointDefinition } from "@fbgfi/types";

const app = new Koa();

prepareMiddleware(app);

interface ExampleEndpoint extends EndpointDefinition {
  params: { asd: number };
  response: { lol: string };
}

const router = new Router();

router.get("/", async () => {
  throw new HTTPResponseError(405, "Root path not implemented");
});

router.get("/api/status", async (ctx) => {
  ctx.status = 200;
});

app.use(router.allowedMethods());
app.use(router.routes());

app.listen(3000);

console.log("Api started");
