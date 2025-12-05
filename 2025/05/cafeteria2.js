const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
let [ranges, _] = input.split("\n\n");

ranges = ranges
  .split("\n")
  .map((range) => {
    const [start, end] = range.split("-").map(Number);
    return { start, end };
  })
  .sort((a, b) => a.start - b.start);

function countNumbers(ranges) {
  if (ranges.length === 0) return 0;

  const merged = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const current = ranges[i];
    const last = merged[merged.length - 1];

    if (current.start <= last.end + 1) {
      // Merge overlapping/adjacent ranges
      last.end = Math.max(last.end, current.end);
    } else {
      merged.push(current);
    }
  }

  // Sum up the lengths of merged ranges
  return merged.reduce(
    (count, range) => count + (range.end - range.start + 1),
    0
  );
}

console.log("nyx", countNumbers(ranges));
