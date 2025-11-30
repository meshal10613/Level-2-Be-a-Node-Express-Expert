const config = {
	app: {
		port: process.env.PORT || 5000,
		env: process.env.NODE_ENV || "development",
		psql_string: process.env.PSQL_CONNECTION_STRING
	}
};

export default config;