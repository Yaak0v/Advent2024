import fs from 'fs';

const inputString = fs.readFileSync('src/day22/input.txt', 'utf-8');
const initialNumbers = inputString.split('\n').map(Number);

const mix = (secretNumber: number, stepNumber: number) =>
  secretNumber ^ stepNumber;

const prune = (secretNumber: number) =>
  ((secretNumber % 16777216) + 16777216) % 16777216;

const nextNumber = (secretNumber: number) => {
  // Step 1
  const stepOneNumber = secretNumber * 64;
  secretNumber = mix(secretNumber, stepOneNumber);
  secretNumber = prune(secretNumber);

  // Step 2
  const stepTwoNumber = Math.floor(secretNumber / 32);
  secretNumber = mix(secretNumber, stepTwoNumber);
  secretNumber = prune(secretNumber);

  // Step 3
  const stepThreeNumber = secretNumber * 2048;
  secretNumber = mix(secretNumber, stepThreeNumber);
  secretNumber = prune(secretNumber);

  return secretNumber;
};

const secretNumberIterator = (secretNumber: number, iterations: number) => {
  for (let i = 0; i < iterations; i++) {
    secretNumber = nextNumber(secretNumber);
  }
  return secretNumber;
};

const finalNumbers = initialNumbers.map((value) =>
  secretNumberIterator(value, 2000)
);

const totalFinalNumbers = finalNumbers.reduce(
  (accumulator, value) => accumulator + value,
  0
);

// const output = nextNumber(704524);

console.log(totalFinalNumbers);
