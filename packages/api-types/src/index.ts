import Koa from "koa";
import { EndpointDefinition } from "@fbgfi/types";

export type RequestState = { user: string; requestId: string };

export type BaseContext<
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

export type Context<EndpointT extends EndpointDefinition> = BaseContext<
  EndpointT["params"],
  EndpointT["query"],
  EndpointT["body"],
  EndpointT["response"]
>;
