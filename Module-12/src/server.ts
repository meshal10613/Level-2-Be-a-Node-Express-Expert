import express, { Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";
import path from "path";

const app = express();
const port = config.app.port;

//? middleware
app.use(express.json()); // for json data
app.use(express.urlencoded({ extended: true })); // for form data

const pool = new Pool({
    connectionString: config.app.psql_string,
});

const initDB = async () => {
    await pool.query(`
		CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			email VARCHAR(255) UNIQUE NOT NULL,
			age INT,
			phone VARCHAR(20),
			address TEXT,
			created_at TIMESTAMP DEFAULT NOW(),
			updated_at TIMESTAMP DEFAULT NOW()
		)
	`);

    await pool.query(`
		CREATE TABLE IF NOT EXISTS todos (
			id SERIAL PRIMARY KEY,
			user_id INT REFERENCES users(id) ON DELETE CASCADE,
			title VARCHAR(255) NOT NULL,
			description TEXT,
			completed BOOLEAN DEFAULT false,
			due_date DATE,
			created_at TIMESTAMP DEFAULT NOW(),
			updated_at TIMESTAMP DEFAULT NOW()
		)
	`);
};

initDB();

app.get("/", async (req: Request, res: Response) => {
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

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
