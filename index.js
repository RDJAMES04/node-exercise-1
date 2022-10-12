const fs = require('fs');
const process = require('process');

const expression = process.argv.slice(2);

const array = fs.readFileSync(expression[0]).toString().split('\n');
for (let i = 0; i < array.length; i += 1) {
  console.log(`${i + 1}: ${array[i]}`);
}
