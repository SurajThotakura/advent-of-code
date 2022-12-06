const fs = require("fs");

let stringsArray = fs.readFileSync("./input.txt", "utf-8").split("\n");

// small letters 97 to 122
// capital letters 65 to 89

const assignPriority = (string, i) => {
  let number = string.charCodeAt(i);
  if (64 < number && number < 91) {
    number = number - 38;
  } else {
    number = number - 96;
  }
  return number;
};

const splitAndNumber = (string) => {
  let firstHalfArray = [];
  let secondHalfArray = [];
  for (let i = 0; i < string.length; i++) {
    if (i < string.length / 2) {
      const number = assignPriority(string, i);
      firstHalfArray.push(number);
    } else {
      const anotherNumber = assignPriority(string, i);
      secondHalfArray.push(anotherNumber);
    }
  }
  let intersection = parseInt(
    firstHalfArray.filter((x) => secondHalfArray.includes(x))
  );
  return intersection;
};

const prioritiesSum = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    sum = sum + splitAndNumber(element);
  }
  return sum;
};

const perChunk = 3 // items per chunk    


const result = stringsArray.reduce((resultArray, item, index) => { 
  const chunkIndex = Math.floor(index/perChunk)

  if(!resultArray[chunkIndex]) {
    resultArray[chunkIndex] = [] // start a new chunk
  }

  resultArray[chunkIndex].push(item)

  return resultArray
}, [])

console.log(result.length)

const secondQuestion = (array) => {
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    const one = array[i][0]
    const two = array[i][1]
    const three = array[i][2]

    const oneTwoCommon = one.split("").filter((x) => two.split("").includes(x));

    const allCommon = three.split("").filter((x) => oneTwoCommon.includes(x));

    sum = sum+assignPriority(allCommon[0],0)
  }

  return sum
};

console.log(secondQuestion(result));
