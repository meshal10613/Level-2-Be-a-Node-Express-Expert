import express, { Request, Response } from "express";
import initDB from "./config/db";
import config from "./config";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
const port = config.app.port;

//? middleware
app.use(express.json()); // for json data
app.use(express.urlencoded({ extended: true })); // for form data

//? initialise DB
initDB();

app.get("/", logger, async (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);
app.use("/auth", authRoutes);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        path: req.url,
        success: false,
        message: "Not Found!",
    });
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
