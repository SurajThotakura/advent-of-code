const fs = require("fs");

let crates = fs.readFileSync("./input.txt", "utf-8").split("\n");

console.log(crates[5].split(''))