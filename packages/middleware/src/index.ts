import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { applyStateParameters } from "./applyStateParameters.ts";
import { applyResponseHeaders } from "./applyResponseHeaders.ts";
import { logRequest } from "./logRequest.ts";
import { handleErrors } from "./handleErrors.ts";

/**
 * Helper function for applying base middleware to the API
 */
export const prepareMiddleware = (app: Koa) => {
  app.use(bodyParser());
  app.use(applyStateParameters);
  app.use(applyResponseHeaders);
  app.use(logRequest);
  app.use(handleErrors);
};
