import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "files.json");

export function readUsers () {
	const data = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(data);
}

export function writeUsers (users: any) {
	const data = JSON.stringify(users, null, 2);
	fs.writeFileSync(filePath, data);
}