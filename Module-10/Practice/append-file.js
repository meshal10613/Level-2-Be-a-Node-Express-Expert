const fs = require("fs");

fs.writeFileSync("./output/app.log", "Application Started \n");
console.log("File Created Successfully!");

const logEntry1 = `${new Date().toISOString()} user logged in\n`;
fs.appendFileSync("./output/app.log", logEntry1);
console.log("User Logged In Successfully!");

const logEntry2 = `${new Date().toISOString()} data fethced\n`;
fs.appendFileSync("./output/app.log", logEntry2);
console.log("Data Fetched Successfully!");