const readTextFileSync = require('../file_read.js');
const split = require('../split.js');

const input = readTextFileSync('./day4_input.txt')
const data = split(input, '\n');
const regexWinningNumbers = /:(.+)\|/g
const regexMyNumbers = /\|(.+)/g

function extractNumbers(str, regex) {
	let match;
	let matches = [];
	
	while ((match = regex.exec(str)) !== null) {
			matches.push(match[1]);
	}
	let result = matches[0].trim().split(' ').map(x => Number(x)).filter(x => x !== 0)
	return result
}

function calculateCardsWon(line) {
	let cardsWon = 0
	const winningNumbers = extractNumbers(line, regexWinningNumbers).reduce((a, v) => ({...a, [v]: v}), {})
	const myNumbers = extractNumbers(line, regexMyNumbers)
	myNumbers.forEach(number => {
		if (winningNumbers[`${number}`]) {
			cardsWon++
		}
	});
	return cardsWon
}

function run() {
	const indexResult = []
	const wonResult = []
	const cardResult = []

	data.forEach((line, index) => {
		indexResult.push(index + 1)
		cardResult.push(1)
		wonResult.push(calculateCardsWon(line));
	})

	for (let i = 0; i < wonResult.length; i++) {
		const element = wonResult[i];
		for (let j = i+1; j <= i + element; j++) {
			cardResult[j] = cardResult[j] + cardResult[i]
		}
	}
	console.log('total', cardResult.reduce((a, b) => a + b, 0))
}

run();