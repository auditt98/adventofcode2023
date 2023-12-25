const readTextFileSync = require('../file_read.js');
const input = readTextFileSync('./day1_input.txt')

function extractLineNumbers(line) {
	let firstDigit = null;
	let lastDigit = null;

	for (let j = line.length - 1, i = 0; j >= 0, i < line.length; j--, i++) {
		if (firstDigit && lastDigit) {
			break;
		}
		if (!firstDigit) {
			if (!isNaN(Number(line[i]))) {
				firstDigit = Number(line[i]);
			}
		}
		if (!lastDigit) {
			if (!isNaN(Number(line[j]))) {
				lastDigitIndex = j;
				lastDigit = Number(line[j]);
			}
		}
	}
	return [firstDigit, lastDigit];
}

function run() {
	const lines = input.split('\n');
	let sum = 0;
	lines.forEach((line) => {
		const [firstDigit, lastDigit] = extractLineNumbers(line);
		if (lastDigit && firstDigit) {
			sum += Number(`${firstDigit}${lastDigit}`);
		}
	})
	console.log(sum);
	return sum;
}
run();