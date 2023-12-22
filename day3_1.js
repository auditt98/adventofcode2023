const readTextFileSync = require('./file_read.js');
const split = require('./split.js');

const input = readTextFileSync('./day3_input.txt')

const dict = {}

function prepareDict(lines) {
	lines.forEach((line, index) => {
		dict[index] = line.split("")
	})
}

function getSurroundingSquare(row, col) {
	const square = [];
	for (let i = Number(row) - 1; i <= Number(row) + 1; i++) {
			if (dict.hasOwnProperty(i)) { // Check if row exists in dict
					for (let j = Number(col) - 1; j <= Number(col) + 1; j++) {
							if (j >= 0 && j < dict[i].length && !(i === Number(row) && j === Number(col))) { // Check if column is within range and not the center point
								square.push({ rowIndex: i, columnIndex: j, value: dict[i][j] });
							}
					}
			}
	}
	return square;
}

function processDict() {
	let sum = 0;
	for (let row in dict) {
		let metNumber = false;
		let surroundingSquares = []
		let numberString = ""

		for (let col = 0; col < dict[row].length; col++) {
			let value = dict[row][col];
			if (isNaN(Number(value))) {
				if (metNumber) {
					const hasCharacter = surroundingSquares.some((square) => {
						return !/^[.\d]+$/.test(square.value);
					})
					if (hasCharacter) {
						sum += Number(numberString);
						console.log('number string', numberString)
					}
					metNumber = false;
					numberString = "";
					surroundingSquares = [];
				} else {
					surroundingSquares = [];
					metNumber = false
				}
			} else {
				metNumber = true;
				surroundingSquares = surroundingSquares.concat(getSurroundingSquare(row, col));
				numberString += value;
			}
		}
	}
	console.log('sum', sum)
	return sum;
}



function run() {
	const lines = split(input, '\n');
	prepareDict(lines);
	processDict();
}

run();