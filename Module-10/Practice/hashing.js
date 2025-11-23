const crypto = require("crypto");

//? Not Recommended
console.log("\nMD5 Hash:");
const md5Hash = crypto.createHash("md5").update("Hello World").digest("hex");
console.log("input: Hello World", "\noutput: ", md5Hash);

console.log("\nsha256 Hash:");
const sha256Hash = crypto
    .createHash("sha256")
    .update("Hello World")
    .digest("hex");
console.log("input: Hello World", "\noutput: ", sha256Hash);


//? ✅✅Recommended
console.log("\nsha512 Hash:");
const sha512Hash = crypto
	.createHash("sha512")
	.update("Hello World")
	.digest("hex");
console.log("input: Hello World", "\noutput: ", sha512Hash);
