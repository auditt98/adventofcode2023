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
/*
	- Five of a Kind, 5 cards same label (AAAAA) 												~ 7   5
	- Four of a Kind, 4 cards same label (AAAAx)												~ 6   4 1
	- Full house, 3 cards same label, 2 cards same label (AAABB)				~ 5   3 2
	- Three of a Kind, 3 cards same label (AAAxx)												~ 4   3 1 1
	- Two Pairs, 2 cards same label, 2 cards same label (AABBx)					~ 3   2 2 1
	- One Pair, 2 cards same label (AAxxx)															~ 2   2 1 1 1
	- High Card, 5 cards different label (ABCDE)												~ 1   1 1 1 1 1

	A,  K,  Q,  J,  T,  9, 8, 7, 6, 5, 4, 3, 2
	14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2

	If 2 hands have the same type, order by rank of first -> last card

	Example:

		32T3K 765 ~ rank 1
		T55J5 684 ~ rank 4
		KK677 28 ~ rank 3
		KTJJT 220 ~ rank 2
		QQQJA 483 ~ rank 5

	Order cards by its rank (weakest to strongest, weakest gets 1, strongest gets $length)
	Multiply the rank by bid, sum to get the result
*/

/*
	{
		3: 2,
		2: 1,
		T: 1,
		K: 1,
	}

	{
		T: 1,
		5: 3,
		J: 1
	}
	{
		K: 2,
		6: 1,
		7: 2
	}
	{
		K: 1,
		T: 2,
		J: 2
	}
	{
		Q: 3,
		J: 1,
		A: 1
	}
*/


//This function evaluates each hand, returns the count of cards in each hand, and the evaluation of the hand
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
			if (handObj[x] === 4) {
				hasFour = true;
			}
			if (handObj[x] === 3) {
				hasThree = true;
			}

		} else {
			handObj[x] = 1;
			objLength++;
		}
	})

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