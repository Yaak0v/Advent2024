import fs from "fs";

const input = fs.readFileSync("src/day1/input.txt", "utf-8");
const lines = input.split('\n')

// Calculate Total Distance
const listOne: number[] = [];
const listTwo: number[] = [];

lines.forEach((element: string) => {
    const line = element.split("   ")
    listOne.push(Number(line[0]))
    listTwo.push(Number(line[1]))
});

listOne.sort((a, b) => a - b)
listTwo.sort((a, b) => a - b)

let totalDistance = 0

for (var line = 0; line < listOne.length; line++) {
    totalDistance = totalDistance + Math.abs(listOne[line] - listTwo[line])
}

console.log(`Total Distance: ${totalDistance}`)

// Calculate Similarity Score
let similarity = 0

for (var line = 0; line < listOne.length; line++) {
    const appearances = listTwo.reduce((accumulator, currentValue) => {
        if (currentValue === listOne[line]) {
            return accumulator + 1;
        }
        return accumulator;
    }, 0);
    similarity = similarity + listOne[line] * appearances
}

console.log(`Similarity Score: ${similarity}`)
