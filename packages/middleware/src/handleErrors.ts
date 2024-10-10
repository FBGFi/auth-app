import { BaseContext } from "@fbgfi/api-types";
import { HTTPResponseError } from "@fbgfi/constants";
import { Next } from "koa";

/**
 * Middleware that logs thrown errors in APIs and responds to the client with default
 * HTTP response codes
 */
export const handleErrors = async (ctx: BaseContext, next: Next) => {
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
