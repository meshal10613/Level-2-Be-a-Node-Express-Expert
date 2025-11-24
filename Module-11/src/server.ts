import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import addRoutes, { RouteHandler, routes } from "./helpers/RouteHandler";

addRoutes("GET", "/", (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
        JSON.stringify({
            message: "Hello World!",
            path: req.url,
        })
    );
});

const server: Server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
        const method = req.method!.toUpperCase() || "";
        const path = req.url || "";
        const methodMap = routes.get(method);
        const handler: RouteHandler | undefined = methodMap?.get(path);

        if (handler) {
            handler(req, res);
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

        // if (req.url === "/" && req.method === "GET") {
        // res.writeHead(200, { "Content-Type": "application/json" });
        // res.end(
        //     JSON.stringify({
        //         message: "Hello World!",
        //         path: req.url,
        //     })
        // );
        // }

        //? health route
        // if (req.url === "/api" && req.method === "GET") {
        //     res.writeHead(200, { "Content-Type": "application/json" });
        //     res.end(
        //         JSON.stringify({
        //             message: "Health Status OK!",
        //             path: req.url,
        //         })
        //     );
        // }

        if (req.url === "/api/users" && req.method === "POST") {
            let body = "";
            // listen for data chunk
            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            req.on("end", () => {
                try {
                    const parseBody = JSON.parse(body);
                    res.end(JSON.stringify(parseBody));
                } catch (error: any) {
                    res.end(error.message);
                }
            });
        }

        if (req.url === "/" && req.method === "POST") {
            req.on("data", (chunk) => {});
        }
    }
);

server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
