import { a } from "./file2.mjs";
import { a as x } from "./file3.mjs";
import utils from "./utils/index.mjs";

console.log(utils.add(a, x));
console.log(utils.subs(a, x));