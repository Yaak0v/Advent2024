const { execSync } = require("child_process");

// Get the day argument from the command line
const day = process.argv[2];
if (!day) {
  console.error("Please specify the day. Usage: yarn run day <day>");
  process.exit(1);
}

try {
  execSync(`ts-node src/day${day}/solution.ts`, { stdio: "inherit" });
} catch (error) {
  console.error(`Failed to run Day ${day}:`, error.message);
}