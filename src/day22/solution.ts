import fs from 'fs';
import { setPriority } from 'os';

const inputString = fs.readFileSync('src/day22/input.txt', 'utf-8');
const inputNum = Number(inputString);

const mix = (secretNumber: number, stepNumber: number) =>
  secretNumber ^ stepNumber;

const prune = (secretNumber: number) => secretNumber % 16777216;

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

const output = nextNumber(inputNum);

console.log(output);
