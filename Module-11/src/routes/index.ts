import parseBody from "../helpers/parseBody";
import addRoutes from "../helpers/RouteHandler";
import sendJson from "../helpers/sendJson";

addRoutes("GET", "/", (req, res) => {
    sendJson(res, 200, { success: true, path: req.url, message: "Hello World!" });
});

addRoutes("GET", "/api", (req, res) => {
    sendJson(res, 200, { success: true, path: req.url, message: "API Status OK!" });
});

addRoutes("POST", "/api/users", async (req, res) => {
    const body = await parseBody(req);
    sendJson(res, 200, { success: true, path: req.url, data: body });
});
