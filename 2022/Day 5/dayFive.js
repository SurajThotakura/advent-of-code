const fs = require("fs");

let crates = fs.readFileSync("./input.txt", "utf-8").split("\n");


// parsing moves info

let moves = crates.slice(10).map((x) =>
  x
    .split(" ")
    .filter((word) => word != "move" && word != "from" && word != "to")
    .map((x) => parseInt(x))
);


// parsing stacks of crates

const createStacks = (array) => {
  let stacks = [[], [], [], [], [], [], [], [], []];
  for (let i = 7; i >= 0; i--) {
    const element = array[i].split(" ");
    let count = 0;
    let stack = 0;
    element.map((x) => {
      if (!x) {
        count++;
        if (count === 4) {
          count = 0;
          stack++;
        }
      } else {
        stacks[stack].push(x);
        stack++;
      }
    });
  }
  return stacks;
};

let stacks = createStacks(crates);


// Operate crane

const applyMoves = (stacks, moves) => {
  moves.map((x) => {
    const ammount = x[0];
    const origin = x[1] - 1;
    const destination = x[2] - 1;

    // romove reverse for part 2
    const carrier = stacks[origin].slice(-ammount).reverse();

    stacks[origin] = stacks[origin].slice(0, stacks[origin].length - ammount);
    stacks[destination] = stacks[destination].concat(carrier);
  });
  return stacks;
};


const finalStacks = applyMoves(stacks, moves);


// Get the top items

const cream = (stacks) => {
  let result = "";
  stacks.map((x) => {
    result = result + x.pop();
  });
  return result
    .split("")
    .filter((word) => word != "[" && word != "]")
    .toString()
    .replace(/,/g, "");
};

console.log(cream(finalStacks));
