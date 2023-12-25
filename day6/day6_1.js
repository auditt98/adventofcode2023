const readTextFileSync = require('../file_read.js');
const split = require('../split.js');

const input = readTextFileSync('./day6_input.txt')
const data = split(input, '\n');

let times = []
let distances = []

function prepare() {
	times = data[0].split(' ').slice(1).filter(x => x !== '').map(x => Number(x))
	distances = data[1].split(' ').slice(1).filter(x => x !== '').map(x => Number(x))
	console.log('times', times)
	console.log('distances', distances)
}

function calculate() {
	let result = 1;
	for (let i = 0; i < times.length; i++) {
		const time = times[i];
		let waysToWin = 0;
		const distance = distances[i];
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
		result *= waysToWin;
	}
	console.log('result', result)
	return result;
}

function run() {
	prepare()
	calculate()
}
run()



