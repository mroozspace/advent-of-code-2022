const fs = require('fs');
const readline = require('readline');

let tempHighestCaloriesIndex = 0
let tempCaloriesSum = 0
let highestCaloriesSum = 0
let highestCaloriesIndex = 0

const fileStream = fs.createReadStream('./input.txt');

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  tempCaloriesSum += Number(line)

  if (tempCaloriesSum > highestCaloriesSum) {
    highestCaloriesSum = tempCaloriesSum
    highestCaloriesIndex = tempHighestCaloriesIndex
  }

  if (line == '') {
    tempHighestCaloriesIndex++
    tempCaloriesSum = 0
  }
}).once('close', () => {
  console.log('highestCaloriesIndex:highestCaloriesSum')
  console.log(highestCaloriesIndex, ':', highestCaloriesSum)
});
