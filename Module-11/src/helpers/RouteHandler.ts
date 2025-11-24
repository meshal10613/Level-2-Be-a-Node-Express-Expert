import { IncomingMessage, ServerResponse } from "http";

export type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void;

export const routes: Map<String, Map<String, RouteHandler>> = new Map();

function addRoutes (method: string, path: string, handler: RouteHandler) {
	if(!routes.has(method)) routes.set(method, new Map());

	routes.get(method)!.set(path, handler);
}

export default addRoutes;