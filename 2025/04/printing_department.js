const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const map = input.split("\n").map((l) => l.split(""));

let count = 0;

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    checkRoll(map, x, y);
  }
}

function checkRoll(map, x, y) {
  if (map[y][x] !== "@") return;

  let neighbors = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;

      try {
        if (map[y + dy][x + dx] === "@") neighbors++;
      } catch (e) {}
    }
  }
  if (neighbors < 4) count++;
}

console.log("nyx", count);
