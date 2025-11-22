const fs = require("fs");

const content1 = "This is a content \nnode.js is awesome";

try {
	fs.writeFileSync("./output/test-sync.txt", content1);
	console.log("file written sync");

} catch (error) {
	console.error(error.message);
}

const content2 = "This is a content too \nasynchronous!!!";

fs.writeFile("./output/test-async.txt", content2, (err) => {
	if (err) {
		console.error("❌ Error writing file:", err.message);
		return;
	}
	console.log("file written async");
});