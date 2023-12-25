const readTextFileSync = require('../file_read.js');
const split = require('../split.js');

const input = readTextFileSync('./day2_input.txt')
const regexGameId = /Game (\d{1,3})/
const regexRed = /(\d+) red/g
const regexBlue = /(\d+) blue/g
const regexGreen = /(\d+) green/g

// 12 red cubes, 13 green cubes, and 14 blue cubes
const MAX_RED_CUBES = 12
const MAX_GREEN_CUBES = 13
const MAX_BLUE_CUBES = 14

function extractNumbers(str, regex) {
	let matches = [];
	let match;

	// Using a loop to find all matches
	while ((match = regex.exec(str)) !== null) {
			matches.push(parseInt(match[1], 10));
	}
	return matches;
}


function calculateGameData(game) {
	const redCubes = extractNumbers(game, regexRed)
	const blueCubes = extractNumbers(game, regexBlue)
	const greenCubes = extractNumbers(game, regexGreen)
	const biggestRed = Math.max(...redCubes)
	const biggestBlue = Math.max(...blueCubes)
	const biggestGreen = Math.max(...greenCubes)
	return biggestRed * biggestBlue * biggestGreen
}

function run() {
	const games = split(input, '\n');
	let sum = 0;
	games.forEach((game) => {
		sum += calculateGameData(game)
	})
	console.log('sum', sum)
}
run();