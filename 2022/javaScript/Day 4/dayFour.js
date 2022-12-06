const fs = require("fs");

// 705 is too low

let spacesArray = fs.readFileSync("./input.txt", "utf-8").split("\n");

const counterOne = (array) => {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    const element = array[i]
      .split(",")
      .map((x) => x.split("-"))
      .map((x) => x.map((y) => parseInt(y)));

    if (element[0][0] <= element[1][0] && element[0][1] >= element[1][1]) {
      count++;
      continue;
    }
    if (element[0][0] >= element[1][0] && element[0][1] <= element[1][1]) {
      count++;
    }
  }
  return count;
};

const test = [
  "2-4,6-8",
  "2-3,4-5",
  "5-7,7-9",
  "2-8,3-7",
  "6-6,4-6",
  "2-6,4-8",
  "4-48,4-4",
];

const counterTwo = (array) => {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    const element = array[i]
      .split(",")
      .map((x) => x.split("-"))
      .map((x) => x.map((y) => parseInt(y)));

    if (element[0][0] <= element[1][0] && element[0][1] >= element[1][0]) {
      count++;
      continue;
    }
    if (element[0][0] <= element[1][1] && element[0][1] >= element[1][1]) {
      count++;
      continue;
    }
    if (element[0][0] >= element[1][0] && element[0][0] <= element[1][1]) {
      count++;
      continue;
    }
    if (element[0][1] >= element[1][1] && element[0][1] <= element[1][1]) {
      count++;
    }
  }
  return count;
};

console.log(counterTwo(spacesArray));
