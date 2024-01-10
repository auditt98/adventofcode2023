const readTextFileSync = require('../file_read.js');
const split = require('../split.js');

const input = readTextFileSync('./day10_input1.txt')
const data = split(input, '\n');
const maze = [];
const loop = [];
const start = [] //coordinate of S
const upMap = {
	"|": true,
	"7": true,
	"F": true,
}

const downMap = {
	"|": true,
	"L": true,
	"J": true,
}

const rightMap = {
	"-": true,
	"J": true,
	"7": true,
}

const leftMap = {
	"-": true,
	"F": true,
	"L": true,
}



function prepare() {
	data.forEach((element, i) => {
		const line = element.split('');
		let indexOfS = line.indexOf('S');
		if (indexOfS > -1) {
			start.push(i);
			start.push(indexOfS);
		}
		maze.push(line);
	});
	console.log('~~~~~~~~Maze~~~~~~~')
	console.log(maze)
	console.log('~~~~~~~~Start~~~~~~~')
	console.log(start)
}

function traceMaze() {
	//starts from S
	let current = start;
	
}


(function run() {
	prepare();
	traceMaze();
})();

