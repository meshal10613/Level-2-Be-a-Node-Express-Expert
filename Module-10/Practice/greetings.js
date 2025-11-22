const args = process.argv;

// process.argv[0] = node path
// process.argv[1] = file path
// proc.argv[2] = first actual argument

const name = args[2] || "guest";
const time = new Date().getHours();

let greeting;

if(time >= 5 && time < 12) {
	greeting = "Good Morning";
} else if(time >= 12 && time < 18) {
	greeting = "Good Afternoon";
} else {
	greeting = "Good Evening";
}

console.log(`${greeting} ${name}`);