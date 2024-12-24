import fs from 'fs';

const input = fs.readFileSync('src/day3/input.txt', 'utf-8');
// console.log(input);

const cleanMultipleStrings = input.match(/mul\((\d{1,3}),(\d{1,3})\)/g);

const createNumberPair = (v: string) => {
  return v.match(/\d{1,3}/g)?.map(Number);
};

const totalValue = cleanMultipleStrings
  ?.map((value) => {
    let numberPair = createNumberPair(value);
    if (numberPair && numberPair.length == 2) {
      return numberPair[0] * numberPair[1];
    } else return 0;
  })
  ?.reduce((accumulator, value) => accumulator + value, 0);
console.log(totalValue);
// part 2
// split by don't()
const splitString = input.split(`don't()`);
// console.log(splitString);
// get all the do() values
const doOnlyMuls = splitString
  .map((value) => value.match(/(?<=do\(\).*)mul\(\d{1,3},\d{1,3}\)/gs))
  .filter((match) => match !== null)
  .flat();
const doOnlyTotal = doOnlyMuls
  ?.map((value) => {
    let numberPair = createNumberPair(value);
    if (numberPair && numberPair.length == 2) {
      return numberPair[0] * numberPair[1];
    } else return 0;
  })
  ?.reduce((accumulator, value) => accumulator + value, 0);
//get the values from the first array
const firstArrayMuls = splitString[0].match(/mul\((\d{1,3}),(\d{1,3})\)/g);
const firstArrayTotal =
  firstArrayMuls
    ?.map((value) => {
      let numberPair = createNumberPair(value);
      if (numberPair && numberPair.length == 2) {
        return numberPair[0] * numberPair[1];
      } else return 0;
    })
    ?.reduce((accumulator, value) => accumulator + value, 0) ?? 0;
const part2Total = firstArrayTotal + doOnlyTotal;
console.log(part2Total);
