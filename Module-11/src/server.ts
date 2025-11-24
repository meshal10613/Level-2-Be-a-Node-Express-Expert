import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";

const server: Server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
        if (req.url === "/" && req.method === "GET") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    message: "Hello World!",
                    path: req.url,
                })
            );
        }

        //? health route
        if (req.url === "/api" && req.method === "GET") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    message: "Health Status OK!",
                    path: req.url,
                })
            );
        }

        if (req.url === "/api/users" && req.method === "POST") {
            // const user = {
            //     id: 1,
            //     name: "Alice",
            // };
            // res.writeHead(200, { "Content-Type": "application/json" });
            // res.end(JSON.stringify(user));

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
