import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";

dotenv.config();
const app = express();
const port = config.app.port;

//? middleware
app.use(express.json()); // for json data
app.use(express.urlencoded()); // for form data

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
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			)
	`);
};

initDB();

app.get("/", async (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.post("/", async (req: Request, res: Response) => {
    const data = req.body;
    console.log(data);

    res.status(201).json({
        success: true,
        message: "API is working....",
        path: req.url,
        data: req.body,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
