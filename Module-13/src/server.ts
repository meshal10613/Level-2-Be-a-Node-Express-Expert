import express, { NextFunction, Request, Response } from "express";
import initDB, { pool } from "./config/db";
import config from "./config";

const app = express();
const port = config.app.port;

//? middleware
app.use(express.json()); // for json data
app.use(express.urlencoded({ extended: true })); // for form data

//? initialise DB
initDB();

// logger middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(true);
    next();
};

app.get("/", logger, async (req: Request, res: Response) => {
    res.send("Hello World!");
});

//* users CRUD
app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
			SELECT * FROM users
		`);

        res.status(200).json({
            path: req.url,
            success: true,
            message: "Users Retrieved Successfully....!",
            data: result.rows,
        });
    } catch (error: any) {
        res.status(500).json({
            path: req.url,
            success: false,
            message: error.message,
            details: error,
        });
    }
});

app.get("/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
            id,
        ]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                path: req.url,
                success: false,
                message: "User Not Found!",
            });
        }

        res.status(200).json({
            path: req.url,
            success: true,
            message: "User Retrieved Successfully....!",
            data: result.rows,
        });
    } catch (error: any) {
        res.status(500).json({
            path: req.url,
            success: false,
            message: error.message,
            details: error,
        });
    }
});

app.put("/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const result = await pool.query(
            `UPDATE users SET name = $1, email= $2 WHERE id = $3 RETURNING *`,
            [name, email, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                path: req.url,
                success: false,
                message: "User Not Found!",
            });
        }

        res.status(200).json({
            path: req.url,
            success: true,
            message: "User Updated Successfully....!",
            data: result.rows,
        });
    } catch (error: any) {
        res.status(500).json({
            path: req.url,
            success: false,
            message: error.message,
            details: error,
        });
    }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `DELETE FROM users WHERE id = $1 RETURNING *`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                path: req.url,
                success: false,
                message: "User Not Found!",
            });
        }

        res.status(200).json({
            path: req.url,
            success: true,
            message: "User Deleted Successfully....!",
            data: null,
        });
    } catch (error: any) {
        res.status(500).json({
            path: req.url,
            success: false,
            message: error.message,
            details: error,
        });
    }
});

app.post("/users", async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const result = await pool.query(
            `
			INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *
		`,
            [data.name, data.email]
        );

        res.status(201).json({
            path: req.url,
            success: true,
            message: "Data Insertded Successfully....!",
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            path: req.url,
            success: false,
            message: error.message,
            details: error,
        });
    }
});

//* todos CRUD
app.get("/todos", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
			SELECT * FROM todos
		`);

        res.status(200).json({
            path: req.url,
            success: true,
            message: "Todos Retrieved Successfully....!",
            data: result.rows,
        });
    } catch (error: any) {
        res.status(500).json({
            path: req.url,
            success: false,
            message: error.message,
            details: error,
        });
    }
});

app.get("/todos/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [
            id,
        ]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                path: req.url,
                success: false,
                message: "Todo Not Found!",
            });
        }

        res.status(200).json({
            path: req.url,
            success: true,
            message: "Todo Retrieved Successfully....!",
            data: result.rows,
        });
    } catch (error: any) {
        res.status(500).json({
            path: req.url,
            success: false,
            message: error.message,
            details: error,
        });
    }
});

app.put("/todos/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { user_id, title } = req.body;
        const result = await pool.query(
            `UPDATE todos SET user_id = $1, title= $2 WHERE id = $3 RETURNING *`,
            [user_id, title, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                path: req.url,
                success: false,
                message: "Todo Not Found!",
            });
        }

        res.status(200).json({
            path: req.url,
            success: true,
            message: "Todo Updated Successfully....!",
            data: result.rows,
        });
    } catch (error: any) {
        res.status(500).json({
            path: req.url,
            success: false,
            message: error.message,
            details: error,
        });
    }
});

app.delete("/todos/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `DELETE FROM todos WHERE id = $1 RETURNING *`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                path: req.url,
                success: false,
                message: "Todo Not Found!",
            });
        }

        res.status(200).json({
            path: req.url,
            success: true,
            message: "Todo Deleted Successfully....!",
            data: null,
        });
    } catch (error: any) {
        res.status(500).json({
            path: req.url,
            success: false,
            message: error.message,
            details: error,
        });
    }
});

app.post("/todos", async (req: Request, res: Response) => {
    try {
        const { user_id, title } = req.body;

        const result = await pool.query(
            `INSERT INTO todos (user_id, title) VALUES ($1, $2) RETURNING *`,
            [user_id, title]
        );
        res.status(201).json({
            path: req.url,
            success: true,
            message: "Todos Insertded Successfully....!",
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            path: req.url,
            success: false,
            message: error.message,
            details: error,
        });
    }
});

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
