import type {RouteHandler} from "itty-router"
export interface RoutingModule {
    get?: RouteHandler<Request>;
    post?: RouteHandler<Request>;
    put?: RouteHandler<Request>;
    patch?: RouteHandler<Request>;
    delete?: RouteHandler<Request>;
    options?: RouteHandler<Request>;
}
