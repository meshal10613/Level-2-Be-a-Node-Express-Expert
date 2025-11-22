const path = require("path");

console.log("Current file info: \n");
console.log("fileName: ", __filename);
console.log("Directory: ", __dirname);

console.log("\n", "-".repeat(50), "\n");

const filePath = "/meshal/documents/nextLevel.pdf";

console.log("Analyzing Path:", filePath, "\n");
console.log("Directory: ", path.dirname(filePath));
console.log("Base Name: ", path.basename(filePath));
console.log("File Extension: ", path.extname(filePath));
console.log("File Name: ", path.basename(filePath, path.extname(filePath)));

console.log("\n", "-".repeat(50), "\n");

const parse = path.parse(filePath);
console.log("Parsed path object: ", parse);

console.log("Formatted path: ", path.format(parse));