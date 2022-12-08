const fs = require("fs");

// let trees = fs.readFileSync("./input.txt", "utf-8").split("\n");
let trees = fs.readFileSync("./testInput.txt", "utf-8").split("\n");

const totalTrees = trees[0].length * trees.length;

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

const treeColumns = genColumns(trees);

const isVisible = (array) => {
  let visibility = [];
  for (let i = 0; i < array.length; i++) {
    const tree = parseInt(array[i]);
    let rightArray = Array.from(array.slice(i, array.length));
    let leftArray = Array.from(array.slice(0, i + 1)).reverse();
    let rightVis = 0;
    rightArray.map((x, index) => {
      if (x >= tree) {
        rightVis++;
      }
      if (index === 0) {
        rightVis = 0;
      }
    });
    let leftVis = 0;
    leftArray.map((x, index) => {
      if (x >= tree) {
        leftVis++;
      }
      if (index === 0) {
        leftVis = 0;
      }
    });

    visibility[i] = rightVis * leftVis;
  }
  return visibility;
};

const trimCorners = (array) => {
  array = array.slice(1, array.length - 1);
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].slice(1, array[i].length - 1);
  }
  return array;
};

console.log(trees);
console.log(treeColumns);

const getVisibility = (array) => {
  for (let i = 0; i < array.length; i++) {
    array[i] = isVisible(array[i]);
  }
  array = trimCorners(array);
  return array;
};
const columnsVisibility = getVisibility(trees);
const rowsVisibility = getVisibility(treeColumns);

const validateVisibility = (row, column) => {
  let invisibleTrees = 0;
  console.log(row);
  console.log(column);
  for (let i = 0; i < row.length; i++) {
    for (let j = 0; j < column.length; j++) {
      if (row[i][j] * column[j][i]) {
        invisibleTrees++;
      }
    }
  }
  return invisibleTrees;
};

const invisibleTrees = validateVisibility(rowsVisibility, columnsVisibility);

const visibleTrees = totalTrees - invisibleTrees;

console.log(visibleTrees, "Part One");