const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
let [ranges, ids] = input.split("\n\n");

ranges = ranges
  .split("\n")
  .map((range) => {
    const [start, end] = range.split("-").map(Number);
    return { start, end };
  })
  .sort((a, b) => a.start - b.start);

ids = ids.split("\n").map(Number);
let freshCounter = 0;

for (let i = 0; i < ids.length - 1; i++) {
  const id = ids[i];
  for (let r = 0; r < ranges.length; r++) {
    const range = ranges[r];
    if (id >= range.start && id <= range.end) {
      freshCounter++;
      break;
    }
  }
}

console.log("nyx", { freshCounter });
