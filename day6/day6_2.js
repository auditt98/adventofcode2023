const readTextFileSync = require('../file_read.js');
const split = require('../split.js');

const input = readTextFileSync('./day6_input.txt')
const data = split(input, '\n');

let time = null
let distance = null

function prepare() {
	time = Number(data[0].split(' ').slice(1).filter(x => x !== '').join(''))
	distance = (data[1].split(' ').slice(1).filter(x => x !== '').join(''))
	console.log('time', time)
	console.log('distance', distance)
}

function calculate() {
	// let result = 1;
	let waysToWin = 0;
	const mid = Math.floor(time / 2);
	for (let speed = 0; speed <= mid; speed++) {
		const timeLeft = time - speed;
		const canMove = speed * timeLeft;
		if (canMove > distance) {
			if (speed === timeLeft) {
				waysToWin += 1;
			} else {
				waysToWin += 2;
			}
		}
		// console.log('speed', speed, 'timeLeft', timeLeft, 'canMove', canMove, 'waysToWin', waysToWin)
	}
	console.log('waysToWin', waysToWin)
	return waysToWin;
}

function run() {
	prepare()
	calculate()
}
run()



