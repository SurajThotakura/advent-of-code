const fs = require("fs");

let terminalCommands = fs.readFileSync("./input.txt", "utf-8").split("\n");

let testString = fs.readFileSync("./test.txt", "utf-8").split("\n");

const splitter = (array) => {
  for (let i = 0; i < array.length; i++) {
    const splitElement = array[i].split(" ").filter((word) => word != "$");
    array[i] = splitElement;
  }
  return array;
};

const dataSplit = splitter(terminalCommands);

const getFolders = (array) => {
  let folders = [];

  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    if (el[1] === "..") {
      continue;
    }
    if (el[0] === "cd") {
      folders.push({ name: el[1], index: i });
    }
  }

  return folders;
};

const foldersArray = getFolders(dataSplit);

const folderSize = (array, folders) => {
  for (let i = 0; i < folders.length; i++) {
    const folderIndex = folders[i].index;
    let filesSize = 0;
    let subFolders = [];
    for (let j = folderIndex + 1; j < array.length; j++) {
      const element = array[j];
      if (element[0] === "cd") {
        break;
      }
      if (element[0] === "ls") {
        continue;
      }
      if (element[0] === "dir") {
        subFolders.push(element[1]);
      } else {
        filesSize = filesSize + parseInt(element[0]);
      }
    }

    folders[i] = {
      ...folders[i],
      filesSize: filesSize,
      subFolders: subFolders,
    };
  }
  return folders;
};

const foldersWithSizes = folderSize(dataSplit, foldersArray).sort((a, b) => {
  return a.index - b.index;
}).reverse();

const getFullSize = (array) => {
    let enoughSpace = []
    let noSubs = []
  for (let i = 0; i < array.length; i++) {
    const subFolders = array[i].subFolders;
    let subFoldersSize = 0;
    if (subFolders.length === 0) {
        noSubs.push(array[i].filesSize)
        if(1518953<=array[i].filesSize){
            enoughSpace.push(array[i])
        }
    }
    for (let j = 0; j < subFolders.length; j++) {
      const el = subFolders[j];
      for (let k = 0; k < array.length; k++) {
        const name = array[k].name;
        if (name === el) {
          subFoldersSize = subFoldersSize + array[k].filesSize;
        }
      }
    }
    array[i].filesSize = array[i].filesSize + subFoldersSize;
    if(1518953<=array[i].filesSize){
        enoughSpace.push(array[i])
    }
  }
  return [array, enoughSpace, noSubs];
};

const [fullSizesFolders, enoughSpaceArray, nosubs] = getFullSize(foldersWithSizes);

const sortedMinSpace = enoughSpaceArray.sort((a, b) => {
    return a.filesSize - b.filesSize;
  })

console.log(sortedMinSpace)

console.log(nosubs.sort((a,b)=> a-b))

const checkSize = (array) => {
  let minFolders = [];
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    const size = array[i].filesSize;
    if (size <= 100000) {
      minFolders.push(array[i]);
      sum = sum + size;
    }
  }
  return [sum];
};

const smallFolders = checkSize(fullSizesFolders);

const totalSize = (array) => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        const el = array[i];
        if(!parseInt(el[0])){
            continue
        }
        sum = sum + parseInt(el[0])
    }
    return sum
}

const freeSpace = 70000000- totalSize(dataSplit)
const minClean = 30000000-freeSpace
console.log(freeSpace, minClean)