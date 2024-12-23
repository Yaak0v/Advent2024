import fs from 'fs';

const input = fs.readFileSync('src/day3/input.txt', 'utf-8');

const cleanMultipleStrings = input.match(/mul\((\d{1,3}),(\d{1,3})\)/g);
console.log(cleanMultipleStrings);
const multipliedValues = cleanMultipleStrings?.map((value, index, array) => {
  let numberPair = value.match(/\d{1,3}/g)?.map(Number);
  return numberPair?.reduce((accumulator, currentValue, index, array) => {
    if (index == 0) {
      return currentValue;
    } else {
      return accumulator * currentValue;
    }
  }, 0);
});
const totalValue = multipliedValues?.reduce((accumulator, value) => {
  //@ts-ignore
  return accumulator + value;
}, 0);
console.log(totalValue);
