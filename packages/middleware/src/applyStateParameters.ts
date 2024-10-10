import { Next } from "koa";
import { BaseContext } from "@fbgfi/api-types";

/**
 * Middleware that applies state parameters to the context
 */
export const applyStateParameters = async (ctx: BaseContext, next: Next) => {
  ctx.state.requestId = crypto.randomUUID();
  await next();
};
