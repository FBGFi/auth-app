import Koa, { Next } from "koa";
import bodyParser from "koa-bodyparser";
import Router from "@koa/router";

const app = new Koa();

type RequestState = { user: string; requestId: string };
type BaseContext<
  ParamsT = unknown,
  QueryParamsT = unknown,
  RequestBodyT = unknown,
  ResponseBodyT = unknown,
> = Koa.ParameterizedContext<
  RequestState,
  {
    params: ParamsT;
    request: {
      query: QueryParamsT;
      body: RequestBodyT;
    };
  },
  ResponseBodyT
>;

type EndpointDefinition<
  ParamsT = unknown,
  QueryParamsT = unknown,
  RequestBodyT = unknown,
  ResponseBodyT = unknown,
> = {
  params: ParamsT;
  query: QueryParamsT;
  body: RequestBodyT;
  response: ResponseBodyT;
};

type Context<EndpointT extends EndpointDefinition> = BaseContext<
  EndpointT["params"],
  EndpointT["query"],
  EndpointT["body"],
  EndpointT["response"]
>;

interface ExampleEndpoint extends EndpointDefinition {
  params: { asd: number };
  response: { lol: string };
}

const REQUEST_ID_HEADER_KEY = "X-Request-Id";

const applyStateParameters = async (ctx: BaseContext, next: Next) => {
  ctx.state.requestId = crypto.randomUUID();
  await next();
};

const applyResponseHeaders = async (ctx: BaseContext, next: Next) => {
  ctx.set(REQUEST_ID_HEADER_KEY, ctx.state.requestId);
  await next();
};

const logRequest = async (ctx: BaseContext, next: Next) => {
  const requestStart = performance.now();
  console.log({
    requestId: ctx.state.requestId,
    reason: "Request",
    method: ctx.request.method,
    endpoint: ctx.request.url,
  });
  await next();
  console.log({
    requestId: ctx.state.requestId,
    reason: "Response",
    method: ctx.request.method,
    endpoint: ctx.request.url,
    status: ctx.status,
    executionTime: `${(performance.now() - requestStart).toFixed(3)}ms`,
  });
};

class HTTPResponseError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string, options?: ErrorOptions) {
    super(message, options);
    this.statusCode = statusCode;
  }
}

const handleErrors = async (ctx: BaseContext, next: Next) => {
  try {
    await next();
  } catch (error) {
    ctx.body = undefined;
    if (error instanceof HTTPResponseError) {
      ctx.status = error.statusCode;
    } else {
      ctx.status = 500;
    }
    if (error instanceof Error) {
      console.error({
        requestId: ctx.state.requestId,
        reason: "Error",
        details: error.stack,
      });
    } else {
      console.error({
        requestId: ctx.state.requestId,
        reason: "Error",
        message: "Unknown error",
      });
    }
  }
};

app.use(bodyParser());
app.use(applyStateParameters);
app.use(applyResponseHeaders);
app.use(logRequest);
app.use(handleErrors);

const router = new Router();

router.get("/", async () => {
  throw new HTTPResponseError(405, "Root path not implemented");
});

router.get("/api/status", async (ctx) => {
  console.log("request");
  ctx.status = 200;
  ctx.body = { asd: 1 };
});

app.use(router.allowedMethods());
app.use(router.routes());

app.listen(3000);

console.log("Api started");
