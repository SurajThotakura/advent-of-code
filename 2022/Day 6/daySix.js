const fs = require("fs");

let signal = fs.readFileSync("./input.txt", "utf-8").split("")

const isArrayUnique = (array) => {
    const uniqueSet = [...new Set(array)]
    if(array.length === uniqueSet.length){
        return true
    }else {
        return false
    }
}

const findMarker = (array, packetLength) => {
    for (let i = 0; i < array.length; i++) {

        const subArray = array.slice(i,i+packetLength)
        if(isArrayUnique(subArray)){
            return i+packetLength
            break
        }
        
    }
}

console.log(findMarker(signal, 4)) // part One
console.log(findMarker(signal, 14)) // part Two