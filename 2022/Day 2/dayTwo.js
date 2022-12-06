const fs = require("fs");

let stratagyArray = fs.readFileSync("./input.txt", "utf-8").split("\n");

let textToNumbers = fs
  .readFileSync("./input.txt", "utf-8")
  .split("")
  .filter((word) => word != "\n" && word != " ")
  .map((x) =>
    x
      .replace("X", "1") // rock
      .replace("Y", "2") // paper
      .replace("Z", "3") // sissors
      .replace("A", "1")
      .replace("B", "2")
      .replace("C", "3")
  );

// Smart Solution

const partOneSmart = (array) => {
    for (let i = 0; i < array.length; i+2) {
        const element = array[i];
        const nextElement =  array[i+1]
        // Draw case
        if(element === nextElement){
            return (parseInt(element) + 3)
        } else{
            // cases for lose and win
        }
    }
}



// Dumb Solution
const partOneMatchSocreCounter = (draw) => {
  // Lose
  if (draw === "B X") {
    return 1;
  }
  if (draw === "C Y") {
    return 2;
  }
  if (draw === "A Z") {
    return 3;
  }

  // Win
  if (draw === "C X") {
    return 7;
  }
  if (draw === "A Y") {
    return 8;
  }
  if (draw === "B Z") {
    return 9;
  }

  // Draw
  if (draw === "A X") {
    return 4;
  }
  if (draw === "B Y") {
    return 5;
  }
  if (draw === "C Z") {
    return 6;
  }
};

const partTwoMatchSocreCounter = (draw) => {
  // Lose
  if (draw === "A X") {
    return 3;
  }
  if (draw === "B X") {
    return 1;
  }
  if (draw === "C X") {
    return 2;
  }

  // Draw
  if (draw === "A Y") {
    return 4;
  }
  if (draw === "B Y") {
    return 5;
  }
  if (draw === "C Y") {
    return 6;
  }

  // Win
  if (draw === "A Z") {
    return 8;
  }
  if (draw === "B Z") {
    return 9;
  }
  if (draw === "C Z") {
    return 7;
  }
};

const scoreCounter = (array) => {
  let totalScore = 0;
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    totalScore = totalScore + partTwoMatchSocreCounter(element);
  }
  console.log(totalScore);
};

testArray = ["A Y", "B X", "C Z"];

scoreCounter(stratagyArray);
