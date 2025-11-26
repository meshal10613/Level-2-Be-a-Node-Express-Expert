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
    users.push(body);
    writeUsers(users);

    sendJson(res, 200, { success: true, path: req.url, data: body });
});

addRoutes("PUT", "/api/users/:id", async(req, res) => {
    const { id } = (req as any).params;
    const body = await parseBody(req);
    const users = readUsers();

    const index = users.findIndex((user: any) => user.id == id);
    if(index === -1) return sendJson(res, 404, { success: false, path: req.url, message: "User not found!" });

    users[index] = { ...users[index], ...body };
    writeUsers(users);

    sendJson(res, 200, { success: true, path: req.url, data: users[index] });
});
