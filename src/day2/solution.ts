import fs from 'fs';

const input = fs.readFileSync('src/day2/inputtextshort.txt', 'utf-8');
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
  return accumulator;
}, 0);

console.log(`There are ${safeLevels} safe reports`);

// Work on multiple levels
const multiLevels = levels.map((value, index, array) => {
  return value.map((value, index, array) => {
    return array.toSpliced(index, 1);
  });
});
console.log(multiLevels);

const safeMultiLevels = multiLevels.reduce(
  // First Level
  (previousValue, currentValueFL, index, array) => {
    let safe: boolean = true;
    // Second Level
    currentValueFL.reduce((accumulator, currentValueSL, index, array) => {
      //Third Level
      currentValueSL.reduce((prevValue, stepValue, index, array) => {
        console.log(`${prevValue}, ${stepValue}, ${array}`);
        let stepDirection: 'increasing' | 'decreasing' | 'flat';
        if (index !== 0) {
          let delta = prevValue - stepValue;
          if (delta > 0) {
            stepDirection = 'decreasing';
          } else if (delta < 0) {
            stepDirection = 'increasing';
          } else {
            stepDirection = 'flat';
          }
          // if (stepDirection !== direction) {
          //   safe = false;
          //   return stepValue;
          // } else if (Math.abs(delta) > 3) {
          //   safe = false;
          //   return stepValue;
        }
        return stepValue;
      }, currentValueSL[0]);
      return currentValueSL;
    });
    return currentValueFL;
  }
);

console.log(multiLevels);
