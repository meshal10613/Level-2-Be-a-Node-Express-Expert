const fs = require("fs");

fs.writeFileSync("./output/temp.txt", "This is a temp file!");
console.log("File created and written successfully!");

if(fs.existsSync("./output/temp.txt")){
	console.log("File exist!");

	//? delete the file
	fs.unlinkSync("./output/temp.txt");
	console.log("File deleted successfully!");
} else {
	console.log("File is not exist here...")
}

// try {
// 	fs.unlinkSync("./output/temp.txt");
// 	console.log("File deleted successfully!");
// } catch (err) {
// 	console.error(err.message)
// }

//? async
fs.writeFile("./output/temp2.txt", "Another temp file!", (err) => {
	if (err) {
		console.error("❌ Error:", err);
		return;
	}
	console.log("Async: File created and written successfully!");

	fs.unlink("./output/temp2.txt", (err) => {
		if (err) {
			console.error("❌ Error:", err);
			return;
		}
		console.log("Async: File deleted successfully!");
	});
});