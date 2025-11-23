const os = require("os");

console.log("System info \n")
console.log("-".repeat(50),"\n");

console.log("Platform: ", os.platform());
console.log("Architechture: ", os.arch());
console.log("OS Type:", os.type());
console.log("OS Release Date: ", os.release());
console.log("HostName: ", os.hostname());

console.log("-".repeat(50));

console.log("CPU info: ");
const cpus = os.cpus();
console.log("CPU Model: ", cpus[0].model);
console.log("CPU Core: ", cpus.length);
console.log("CPU Speed: ", cpus[0].speed);

console.log("-".repeat(50));

const totalMem = os.totalmem();
const freeMem = os.freemem();
console.log("Total Memory", (totalMem / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log("Free Memory", (freeMem / 1024 / 1024 / 1024).toFixed(2), "GB");

console.log("-".repeat(50));

const upTime = os.uptime();
const days = Math.floor(upTime / (60 * 60 * 24));
const hours = Math.floor((upTime / (60 * 60)) % 24);
const minutes = Math.floor((upTime / 60) % 60);
console.log("Up Time: ", days, "Days", hours, "Hours", minutes, "Minutes");