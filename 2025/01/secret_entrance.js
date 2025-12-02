const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = input.trim().split("\n");

let dial = 50;
let zero_counter = 0;
console.log(`Dial Position: ${dial}`);

const turnRight = (currentDial, steps) => (currentDial + steps) % 100;
const turnLeft = (currentDial, steps) => (currentDial - steps + 100) % 100;

for (let i = 0; i < lines.length; i++) {
  const direction = lines[i].charAt(0);
  const steps = parseInt(lines[i].slice(1));
  console.log(`Direction: ${direction}, Steps: ${steps}`);

  if (direction === "R") dial = turnRight(dial, steps);
  if (direction === "L") dial = turnLeft(dial, steps);

  console.log(`New Dial Position: ${dial}`);
  if (dial === 0) zero_counter++;
}

console.log(`Total times dial left at zero: ${zero_counter}`); // 1152
