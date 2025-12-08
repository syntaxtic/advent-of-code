const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
let lines = input.split("\n");

const operators = lines.at(-2).split(/\s+/);
const columnTotals = Array(operators.length)
  .fill(0)
  .map((_, idx) => (operators[idx] === "*" ? 1 : 0));

for (let i = 0; i < lines.length - 2; i++) {
  const line = lines[i].trim().split(/\s+/);
  for (let j = 0; j < operators.length; j++) {
    const number = Number(line[j]);
    if (operators[j] === "+") {
      columnTotals[j] += number;
    } else if (operators[j] === "*") {
      columnTotals[j] *= number;
    }
  }
}

const grandTotal = columnTotals.reduce((acc, val) => acc + val, 0);

console.log("nyx", grandTotal);
