import { BaseContext } from "@fbgfi/api-types";
import { Next } from "koa";

/**
 * Middleware that provides logging to the start and end of requests
 */
export const logRequest = async (ctx: BaseContext, next: Next) => {
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
