import fs from 'fs';

const input = fs.readFileSync('src/day3/input.txt', 'utf-8');

const cleanMultipleStrings = input.match(/mul\((\d{1,3}),(\d{1,3})\)/g);
const multipliedValues =
  cleanMultipleStrings?.map((value, index, array) => {
    let numberPair = value.match(/\d{1,3}/g)?.map(Number);
    if (numberPair && numberPair.length == 2) {
      return numberPair[0] * numberPair[1];
    } else return 0;
  }) ?? [];
const totalValue = multipliedValues?.reduce((accumulator, value) => {
  return accumulator + value;
}, 0);
console.log(totalValue);
