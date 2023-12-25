const readTextFileSync = require('../file_read.js');
const split = require('../split.js');

const input = readTextFileSync('./day7_input.txt')
const data = split(input, '\n');

let hands = [];
let bids = [];

const lookup = {
	'2': 2,
	'3': 3,
	'4': 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9,
	T: 10,
	J: 1,
	Q: 12,
	K: 13,
	A: 14
}

function mapHand(hand, bid) {
	const handObj = {};
	let evaluate = null;
	let objLength = 0;
	let hasFour = false;
	let hasThree = false;
	const splitted = hand.split('');
	const convert = []
	splitted.forEach(x => {
		convert.push(lookup[x]);
		if (handObj[x]) {
			handObj[x]++;
		} else {
			handObj[x] = 1;
		}
	})
	if (handObj['J']) {
		const jValue = handObj['J'];
		let highestValue = 0;
		let highestKey = null;
		for (let key in handObj) {
			if (handObj[key] > highestValue && key !== 'J') {
				highestValue = handObj[key];
				highestKey = key;
			}
		}
		handObj[highestKey] += jValue;
		delete handObj['J'];
	}
	console.log('handObj', handObj);
	for(let key in handObj) {
		objLength++;
		if (handObj[key] === 4) {
			hasFour = true;
		}
		if (handObj[key] === 3) {
			hasThree = true;
		}
	}

	switch (objLength) {
		case 1:
			evaluate = 7;
			break;
		
		case 2:
			if (hasFour) {
				evaluate = 6;
			} else {
				evaluate = 5;
			}
			break;
		
		case 3:
			if (hasThree) {
				evaluate = 4;
			} else {
				evaluate = 3;
			}
			break;
		
		case 4:
			evaluate = 2;
			break;
		
		case 5:
			evaluate = 1;
			break;
	}
	console.log('evaluate', evaluate);
	return [evaluate, convert, bid];
}

function comparator(a, b) {
	//a, b are arrays of [evaluate, convert]
	const rankDeterminer = a[0] - b[0];
	if (rankDeterminer !== 0) {
		return rankDeterminer;
	}
	for (let i = 0; i < a[1].length; i++) {
		if (a[1][i] !== b[1][i]) {
			return a[1][i] - b[1][i];
		}
	}
}


function calculate() {
	const allMaps = [];
	for (let i = 0; i < hands.length; i++) {
		const map = mapHand(hands[i], bids[i]);
		allMaps.push(map);
	}
	allMaps.sort(comparator);
	let result = 0;
	for (let i = 1; i <= allMaps.length; i++) {
		result += i * allMaps[i -1][2];
	}
	console.log('result', result);
	return result;
}

function prepare() {
	hands = data.map(x => x.split(' ')[0]);
	bids = data.map(x => Number(x.split(' ')[1]));
}

function run() {
	prepare();
	calculate();
}

run();