const readTextFileSync = require('../file_read.js');
const split = require('../split.js');

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
	let resultDict = {}


	for (let row in dict) {
		let metNumber = false;
		let surroundingSquares = []
		let numberString = ""

		for (let col = 0; col < dict[row].length; col++) {
			let value = dict[row][col];
			if (isNaN(Number(value))) {
				if (metNumber) {
					const starCharacter = surroundingSquares.find((square) => {
						return square.value === "*"
					})
					
					if (starCharacter) {
						console.log('starCharacter', starCharacter)
						if (!resultDict[`${starCharacter.rowIndex},${starCharacter.columnIndex}`]) {
							resultDict[`${starCharacter.rowIndex},${starCharacter.columnIndex}`] = [numberString]
						} else {
							resultDict[`${starCharacter.rowIndex},${starCharacter.columnIndex}`].push(numberString)
						}
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
	//loop through resultDict
	const filteredObj = Object.fromEntries(
		Object.entries(resultDict).filter(([key, value]) => value.length === 2)
	)
	for (let key in filteredObj) {
		sum += Number(filteredObj[key][0]) * Number(filteredObj[key][1])
		console.log('calc', Number(filteredObj[key][0]) * Number(filteredObj[key][1]))
	}

	console.log('resultDict', resultDict)
	console.log('filteredObj', filteredObj)
	console.log('sum', sum)
	return sum;
}



function run() {
	const lines = split(input, '\n');
	prepareDict(lines);
	processDict();
}

run();