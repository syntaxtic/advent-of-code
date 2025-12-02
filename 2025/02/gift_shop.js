const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const ranges = input.trim().split(",");

let total = 0;

for (let i = 0; i < ranges.length; i++) {
  const [start, end] = ranges[i].split("-").map(Number);
  collectInvalidIds(start, end);
}

function collectInvalidIds(start, end) {
  for (let id = start; id <= end; id++) {
    const idString = id.toString();
    if (idString.length % 2 !== 0) continue;
    const firstHalf = idString.slice(0, idString.length / 2);
    const secondHalf = idString.slice(idString.length / 2);
    if (firstHalf === secondHalf) {
      total += id;
    }
  }
}

console.log(total);
