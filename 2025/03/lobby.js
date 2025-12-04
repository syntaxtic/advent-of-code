const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const banks = input.trim().split("\n");

let totalJoltage = 0;

for (let i = 0; i < banks.length; i++) {
  const bank = banks[i];
  totalJoltage += getMaxPossibleJoltage(bank);
}

function getMaxPossibleJoltage(bank) {
  if (bank.length < 2) return 0;

  let firstDigit = Number(bank[0]);
  let secondDigit = Number(bank[1]);

  for (let i = 0; i < bank.length; i++) {
    const digit = Number(bank[i]);

    if (digit > firstDigit && i < bank.length - 1) {
      firstDigit = digit;
      secondDigit = Number(bank[i + 1]);
    } else if (digit > secondDigit && i > 0) {
      secondDigit = digit;
    }
  }

  const maxJoltage = firstDigit * 10 + secondDigit;
  console.log("nyx", { maxJoltage });

  return maxJoltage;
}

console.log({ totalJoltage });
