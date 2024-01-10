const readTextFileSync = require('../file_read.js');
const split = require('../split.js');

const input = readTextFileSync('./day9_input.txt')
const data = split(input, '\n');
const histories = []

function prepare() {
	data.forEach(element => {
		const line = element.split(' ').map(x => Number(x));
		histories.push(line);
	});
}

function processHistoryDifference(history) {
	const sequence = [history];
	let index = 0;
	while (index < sequence.length) {
		const currentSequence = sequence[index];
		if (currentSequence.every(x => x === 0)) break;
		let newSequence = currentSequence.map((v, i, arr) => {
			if (i === arr.length - 1) {
				return null;
			}
			return arr[i + 1] - v;
		})
		newSequence.pop();
		sequence.push(newSequence);
		index = index + 1;
	}
	return sequence;
}

function extrapolate(sequence) {
	sequence[sequence.length - 1].unshift(0);
	let previousExtrapolator = sequence[sequence.length - 1];
	let previousExtrapolatorValue = previousExtrapolator[0];
	for (let i = sequence.length - 2; i >= 0; i--) {
		let currentExtrapolator = sequence[i];
		let currentExtrapolatorValue = currentExtrapolator[0];
		currentExtrapolator.unshift(currentExtrapolatorValue - previousExtrapolatorValue)
		previousExtrapolator = currentExtrapolator;
		previousExtrapolatorValue = currentExtrapolatorValue - previousExtrapolatorValue;
	}
	return sequence[0][0];
}

function run() {
	prepare();
	let sum = 0;
	histories.forEach(history => {
		const sequence = processHistoryDifference(history);
		const result = extrapolate(sequence);
		sum+= result;
	})
	console.log('sum', sum)
}

run();