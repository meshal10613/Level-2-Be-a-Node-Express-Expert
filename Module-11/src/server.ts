import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import { RouteHandler, routes } from "./helpers/RouteHandler";
import "./routes";
import findDynamicRoute from "./helpers/dynamicRouteHandler";


const server: Server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
        const method = req.method!.toUpperCase() || "";
        const path = req.url || "";
        const methodMap = routes.get(method);
        const handler: RouteHandler | undefined = methodMap?.get(path);

        if (handler) {
            handler(req, res);
        } else if(findDynamicRoute(method, path)){
            const match = findDynamicRoute(method, path);
            (req as any).params = match?.params;
            match?.handler(req, res);
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    success: false,
                    message: "Not Found!",
                    path: req.url,
                })
            );
        }
    }
);

server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
