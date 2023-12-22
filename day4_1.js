const readTextFileSync = require('./file_read.js');
const split = require('./split.js');

const input = readTextFileSync('./day4_input.txt')
const data = split(input, '\n');

const regexWinningNumbers = /:(.+)\|/g
const regexMyNumbers = /\|(.+)/g

function extractNumbers(str, regex) {
	let match;
	let matches = [];
	
	while ((match = regex.exec(str)) !== null) {
			// The captured group is at index 1
			matches.push(match[1]);
	}
	let result = matches[0].trim().split(' ').map(x => Number(x)).filter(x => x !== 0)
	return result
}

function double(num) {
	return num * 2
}

function calculatePoint(line) {
	let point = 0;
	const winningNumbers = extractNumbers(line, regexWinningNumbers).reduce((a, v) => ({...a, [v]: v}), {})
	const myNumbers = extractNumbers(line, regexMyNumbers)
	myNumbers.forEach(number => {
		if (winningNumbers[`${number}`]) {
			point = point === 0 ? 1 : double(point)
		}
	});
	return point;
}


function run() {
	let result = 0
	data.forEach((line) => {
		result += calculatePoint(line)
	})
	console.log('result', result)
	return result;
}

run();