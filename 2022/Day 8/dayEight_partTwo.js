// Part two
const fs = require("fs");

let freshTrees = fs.readFileSync("./input.txt", "utf-8").split("\n");
// let freshTrees = fs.readFileSync("./testInput.txt", "utf-8").split("\n");

const genColumns = (array) => {
    let columnArray = [];
    for (let i = 0; i < array.length; i++) {
      const row = array[i];
      for (let j = 0; j < row.length; j++) {
        if (columnArray[j] === undefined) {
          columnArray[j] = "";
        }
        const tree = row[j];
        columnArray[j] = columnArray[j] + tree;
      }
    }
    return columnArray;
  };

  let treeColumns = genColumns(freshTrees)

const sceneScore = (array) => {
  let visibility = [];
  for (let i = 0; i < array.length; i++) {
    const tree = parseInt(array[i]);
    let rightArray = Array.from(array.slice(i, array.length));
    let leftArray = Array.from(array.slice(0, i + 1)).reverse();
    let rightVis = 0;
    for (let i = 1; i < rightArray.length; i++) {
      const x = rightArray[i];
      if (tree > x) {
        rightVis++;
      }
      if (tree <= x) {
        rightVis++;
        break;
      }
    }
    let leftVis = 0;
    for (let j = 1; j < leftArray.length; j++) {
      const x = leftArray[j];
      if (x < tree) {
        leftVis++;
      }
      if (x >= tree) {
        leftVis++;
        break;
      }
    }

    visibility[i] = rightVis * leftVis;
  }
  return visibility;
};

const getScore = (array) => {
  for (let i = 0; i < array.length; i++) {
    array[i] = sceneScore(array[i]);
  }
  return array;
};

const getFullScore = (row, column) => {
  let score = [];
  for (let i = 0; i < row.length; i++) {
    for (let j = 0; j < column.length; j++) {
      score.push(row[i][j] * column[j][i]);
    }
  }
  return score;
};

const row = getScore(freshTrees);
const col = getScore(treeColumns);

const FullScore = getFullScore(row, col).sort((a,b) => a-b).reverse()

console.log(FullScore)

console.log(FullScore[0], "Part Two");
