import fs from "fs";

const input = fs.readFileSync("src/day2/input.txt", "utf-8");
const reports: string[] = input.split('\n')
const levels: string[][] = reports.map((value) => value.split(' ')) 

console.log(levels)