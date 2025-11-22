const fs = require("fs");

console.log("Start Reading....");

try {
    const dataSync = fs.readFileSync("./data/diary.txt", "utf-8");
    console.log("📄 Sync Read:", dataSync);
} catch (error) {
    console.log(error.message);
}

console.log("Finish Reading....");