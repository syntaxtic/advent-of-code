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
  if (bank.length < 12) return 0;
  const digits = new Array(12).fill(0);

  for (let i = 0; i < bank.length; i++) {
    const digit = Number(bank[i]);
    insertDigitInOrder(digits, digit, bank.length - i - 1);
  }

  const maxJoltage = getVoltageFromDigits(digits);
  return maxJoltage;
}

function insertDigitInOrder(digits, digit, remainingCount) {
  for (let i = 0; i < digits.length; i++) {
    if (digit <= digits[i] || remainingCount < digits.length - i - 1) continue;

    digits.splice(i, 1, digit);
    for (let j = i + 1; j < digits.length; j++) {
      digits[j] = 0;
    }
    break;
  }
}

function getVoltageFromDigits(digits) {
  const str = digits.join("");

  console.log("nyx", str);

  return Number(str);
}

console.log({ totalJoltage });
