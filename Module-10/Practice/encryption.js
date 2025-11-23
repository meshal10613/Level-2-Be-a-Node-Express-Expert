const crypto = require("crypto");

const algorithm = "aes-256-cbc";

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    const ciphar = crypto.createCipheriv(algorithm, key, iv);
	let encrypted = ciphar.update(text, "utf-8", "hex");
	encrypted += ciphar.final("hex");

	return {
		iv: iv.toString("hex"),
		encryptedData: encrypted
	}
};


function decrypt (encryptedData, ivHex) {
	const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, "hex"));
	let decrypted = decipher.update(encryptedData, "hex", "utf-8");
	decrypted += decipher.final("utf-8");

	return decrypted;
};

console.log("Encrypted Data: ");
const sensitiveData = "My Credit Card: 4242 4242 4242 4242";
console.log("Original Data: ", sensitiveData);

const encrypted = encrypt(sensitiveData);
console.log("Encrypted: ", encrypted);

console.log("Decrypted Data: ");
const decrypted = decrypt(encrypted.encryptedData, encrypted.iv);
console.log("Decrypted: ", decrypted);
console.log("Data Match: ", sensitiveData === decrypted);