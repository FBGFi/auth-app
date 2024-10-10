export type EndpointDefinition<
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
