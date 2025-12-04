const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const map = input.split("\n").map((l) => l.split(""));

const removed = new Set();
const removable = new Set();

do {
  removable.clear();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      checkRoll(map, x, y);
    }
  }

  removable.forEach((e) => removed.add(e));
} while (removable.size > 0);

function checkRoll(map, x, y) {
  if (map[y][x] !== "@") return;

  let neighbors = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;

      try {
        if (map[y + dy][x + dx] === "@" && !removed.has(`${x + dx},${y + dy}`))
          neighbors++;
      } catch (e) {}
    }
  }
  if (neighbors < 4 && !removed.has(`${x},${y}`)) {
    removable.add(`${x},${y}`);
  }
}

console.log("nyx", removed.size);
