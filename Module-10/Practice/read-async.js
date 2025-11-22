const fs = require("fs");

console.log("Start Reading....");

fs.readFile("./data/diary.txt", "utf-8", (err, data) => {
	if (err) {
		console.log("❌ Error reading file:", err.message);
		return;
	}
	console.log("📄 Async Read:", data);
});


console.log("Finish Reading....- no blocking");
