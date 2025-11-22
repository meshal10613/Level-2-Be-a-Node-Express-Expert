const fs = require("fs");
const { json } = require("stream/consumers");

try {
	const jsonData = fs.readFileSync("./data/user.json", "utf-8");
	const data = JSON.parse(jsonData);
	console.log(data)
} catch (error) {
	console.log(error.message)
}

fs.readFile("./data/user.json", "utf-8", (err, data) => {
	if (err) {
		console.log("❌ Error reading file:", err.message);
		return;
	}
	const user = JSON.parse(data);
	console.log("📄 Async Read:", user);
})