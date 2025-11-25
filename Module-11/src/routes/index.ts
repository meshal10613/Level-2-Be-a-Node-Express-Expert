import parseBody from "../helpers/parseBody";
import addRoutes from "../helpers/RouteHandler";
import sendJson from "../helpers/sendJson";
import { readUsers, writeUsers } from "../helpers/fileDB";

addRoutes("GET", "/", (req, res) => {
    sendJson(res, 200, {
        success: true,
        path: req.url,
        message: "Hello World!",
    });
});

addRoutes("GET", "/api", (req, res) => {
    sendJson(res, 200, {
        success: true,
        path: req.url,
        message: "API Status OK!",
    });
});

addRoutes("POST", "/api/users", async (req, res) => {
    const body = await parseBody(req);

    const users = readUsers();
    const newUser = { id: Date.now(), ...body };
    users.push(newUser);
    writeUsers(users);

    sendJson(res, 200, { success: true, path: req.url, data: body });
});
