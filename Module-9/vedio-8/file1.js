const { a } = require("./file2");
const { a: x } = require("./file3");
const { add, subs } = require("./utils");

console.log(add(x, a));
console.log(subs(x, a))