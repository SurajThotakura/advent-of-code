const fs = require("fs");

let caloriesArray = fs.readFileSync("./input.txt", "utf-8").split("\n");

const calCounter = (array) => {
  let sumArray = [];
  let tempSum = 0;
  let splitPlace = 0;
  let LargestSumElf = 0;

  for (let i = 0; i <= array.length; i++) {
    const element = array[i];
    if (element === "" || i == array.length) {
      sumArray.push(tempSum);
      tempSum = 0;
      splitPlace++;
    } else {
      tempSum = tempSum + parseInt(element);
      if (tempSum > TopThree[0]) {
        LargestSumElf = splitPlace;
      }
    }
  }
  sumArray.sort((a, b) => a - b);
  sumArray.reverse();
  const sumOfTopThree = sumArray[0] + sumArray[1] + sumArray[2];
  console.log(sumArray[0], sumArray[1], sumArray[2]);
  console.log(LargestSumElf + 1);
  console.log(sumOfTopThree);
};

calCounter(caloriesArray);
