import { BaseContext } from "@fbgfi/api-types";
import { Next } from "koa";
import { REQUEST_ID_HEADER_KEY } from "@fbgfi/constants";

/**
 * Middleware that applies headers to the request response
 */
export const applyResponseHeaders = async (ctx: BaseContext, next: Next) => {
  ctx.set(REQUEST_ID_HEADER_KEY, ctx.state.requestId);
  await next();
};
