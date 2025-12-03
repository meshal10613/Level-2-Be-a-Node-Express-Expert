import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(process.cwd(), ".env")});

const config = {
	app: {
		port: process.env.PORT || 5000,
		env: process.env.NODE_ENV || "development",
		psql_string: process.env.PSQL_STRING
	}
};

export default config;