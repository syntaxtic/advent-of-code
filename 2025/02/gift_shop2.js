const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const ranges = input.trim().split(",");

let total = 0;

for (let i = 0; i < ranges.length; i++) {
  const [start, end] = ranges[i].split("-").map(Number);
  for (let id = start; id <= end; id++) {
    const idString = id.toString();
    if (/^(.+)\1+$/.test(idString)) {
      total += id;
    }
  }
}

console.log(total);
