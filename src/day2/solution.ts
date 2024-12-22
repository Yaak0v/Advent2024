import fs from 'fs';

const input = fs.readFileSync('src/day2/input.txt', 'utf-8');
const reports: string[] = input.split('\n');
const levels = reports.map((value) => value.split(' ').map(Number));

const safeLevels = levels.reduce((accumulator, currentValue, index) => {
  // Determine start direction
  let safe: boolean = true;
  let direction: 'increasing' | 'decreasing' | 'flat';
  if (currentValue[0] - currentValue[1] > 0) {
    direction = 'decreasing';
  } else if (currentValue[0] - currentValue[1] < 0) {
    direction = 'increasing';
  } else {
    // return if flat
    direction = 'flat';
    return accumulator;
  }

  //   Check if direction stays the same and if there are any jumps larger than 3
  currentValue.reduce((previousValue, stepValue, index) => {
    let stepDirection: 'increasing' | 'decreasing' | 'flat';
    if (index !== 0) {
      let delta = previousValue - stepValue;
      if (delta > 0) {
        stepDirection = 'decreasing';
      } else if (delta < 0) {
        stepDirection = 'increasing';
      } else {
        stepDirection = 'flat';
      }
      if (stepDirection !== direction) {
        safe = false;
        return stepValue;
      } else if (Math.abs(delta) > 3) {
        safe = false;
        return stepValue;
      }
    }
    return stepValue;
  }, currentValue[0]);

  if (safe == true) accumulator++;
  console.log(`Level ${index}: ${currentValue} ${safe}`);
  return accumulator;
}, 0);

console.log(safeLevels);
