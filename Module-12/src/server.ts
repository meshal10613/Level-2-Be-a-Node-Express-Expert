import express, { Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";

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
            success: true,
            message: "Data Insertded Successfully....!",
            path: req.url,
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            path: req.url,
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
