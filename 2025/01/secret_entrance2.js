const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = input.trim().split("\n");

let dial = 50;
let zero_counter = 0;
console.log(`Dial Position: ${dial}`);

const turnRight = (currentDial, steps) => {
  if (currentDial + steps >= 100) zero_counter++;
  return (currentDial + steps) % 100;
};

const turnLeft = (currentDial, steps) => {
  if (currentDial > 0 && currentDial - steps <= 0) zero_counter++;
  return (currentDial - steps + 100) % 100;
};

for (let i = 0; i < lines.length; i++) {
  const direction = lines[i].charAt(0);
  let steps = parseInt(lines[i].slice(1));
  console.log(`Direction: ${direction}, Steps: ${steps}`);

  const full_cycles = Math.floor(steps / 100);
  zero_counter += full_cycles;
  steps %= 100;

  if (steps === 0) continue;
  if (direction === "R") dial = turnRight(dial, steps);
  if (direction === "L") dial = turnLeft(dial, steps);

  console.log(`New Dial Position: ${dial}`);
}

console.log(`Total times dial left at zero: ${zero_counter}`); // 6671

// edge case:
// waiting at 0 and turning left 521 steps
// 5 full cycles + ends at 79
// zero counter should increase by 5
