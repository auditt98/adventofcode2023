const readTextFileSync = require('../file_read.js');
const input = readTextFileSync('./day1_input.txt')

const acceptableDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function extractLineNumbersAndText(line) {
	let firstDigitResult = null;
	let lastDigitResult = null;

	let firstDigit = null;
	let firstDigitIndex = null;
	let lastDigit = null;
	let lastDigitIndex = null;

	for (let j = line.length - 1, i = 0; j >= 0, i < line.length; j--, i++) {
		if (firstDigit && lastDigit) {
			break;
		}
		if (!firstDigit) {
			if (!isNaN(Number(line[i]))) {
				firstDigitIndex = i;
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
	const firstIndexes = acceptableDigits.map(value => line.indexOf(value))
	const lastIndexes = acceptableDigits.map(value => line.lastIndexOf(value))

	let lowestValue = Infinity;
	let lowestIndex = -1;

	for (let i = 0; i < firstIndexes.length; i++) {
			if (firstIndexes[i] !== -1 && firstIndexes[i] < lowestValue) {
					lowestValue = firstIndexes[i];
					lowestIndex = i;
			}
	}
	let highestValue = -Infinity;
	let highestIndex = -1;

	for (let i = 0; i < lastIndexes.length; i++) {
			if (lastIndexes[i] !== -1 && lastIndexes[i] > highestValue) {
					highestValue = lastIndexes[i];
					highestIndex = i;
			}
	}
	if (lowestIndex === -1) {
		firstDigitResult = firstDigit;
	} else {
		if (lowestValue < firstDigitIndex) {
			firstDigitResult = lowestIndex + 1;
		} else {
			firstDigitResult = firstDigit;
		}
	}
	if (highestIndex === -1) {
		lastDigitResult = lastDigit;
	} else {

		if (highestValue > lastDigitIndex) {
			lastDigitResult = highestIndex + 1;
		} else {
			lastDigitResult = lastDigit;
		}
	}
	return [firstDigitResult, lastDigitResult]
}

function run() {
	const lines = input.split('\n');
	let sum = 0;
	lines.forEach((line) => {
		const [firstDigit, lastDigit] = extractLineNumbersAndText(line);
		if (lastDigit && firstDigit) {
			sum += Number(`${firstDigit}${lastDigit}`);
		}
	})
	console.log(sum);
	return sum;
}
run();