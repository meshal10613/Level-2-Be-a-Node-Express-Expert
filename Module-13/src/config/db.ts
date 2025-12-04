import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
    connectionString: config.app.psql_string,
	ssl: { rejectUnauthorized: false },
});

const initDB = async () => {
    await pool.query(`
		CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			email VARCHAR(255) UNIQUE NOT NULL,
			password TEXT NOT NULL,
			role VARCHAR(50) NOT NULL,
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

export default initDB;