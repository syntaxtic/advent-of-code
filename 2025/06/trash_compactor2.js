const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = input.split("\n");
const numbers = [];

const operatorLine = lines.at(-2);
const operatorsWithIdx = [];

for (let i = 0; i < operatorLine.length; i++) {
  if (operatorLine[i] !== " ") {
    operatorsWithIdx.push({
      operator: operatorLine[i],
      start: i,
      end: null,
      longest: 0,
    });
    if (operatorsWithIdx.length > 1) {
      operatorsWithIdx.at(-2).end = i - 2;
    }
  }
}

// console.log('nyx', operatorsWithIdx);

for (let i = 0; i < lines.length - 2; i++) {
  const line = lines[i];
  for (let j = 0; j < operatorsWithIdx.length; j++) {
    const { start, end } = operatorsWithIdx[j];
    const numberStr = line.slice(start, end === null ? undefined : end + 1);
    const number = numberStr;
    if (!numbers[i]) {
      numbers[i] = [];
    }
    numbers[i].push(number);

    if (number.length > operatorsWithIdx[j].longest) {
      operatorsWithIdx[j].longest = number.length;
    }
  }
}

// complete last line
const lastIndex = operatorsWithIdx.length - 1;
for (let i = 0; i < numbers.length; i++) {
  const numberStr = numbers[i][lastIndex];
  const missingZeros = operatorsWithIdx[lastIndex].longest - numberStr.length;
  numbers[i][lastIndex] = numberStr + "0".repeat(missingZeros);
}

let grandTotal = BigInt(0);
// for each column
for (let i = 0; i < operatorsWithIdx.length; i++) {
  const { operator, longest } = operatorsWithIdx[i];
  let total = operator === "*" ? BigInt(1) : BigInt(0);

  for (let digit = 0; digit < longest; digit++) {
    let numberStr = "";
    for (let row = 0; row < numbers.length; row++) {
      if (numbers[row][i][digit] !== " ") {
        numberStr += numbers[row][i][digit];
      }
    }
    console.log('nyx', { numberStr, i, digit });
    total =
      operator === "*" ? total * BigInt(numberStr) : total + BigInt(numberStr);
  }
  // console.log('nyx', total);
  grandTotal += total;
}

console.log("nyx", grandTotal);
