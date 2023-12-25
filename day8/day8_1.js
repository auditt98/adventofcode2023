const readTextFileSync = require('../file_read.js');
const split = require('../split.js');

const input = readTextFileSync('./day8_input1.txt')
const data = split(input, '\n');
let instructions = [];
// class Node {
// 	constructor(value) {
// 		this.value = value;
// 		this.left = null;
// 		this.right = null;
// 	}

// 	constructor(value, left, right) {
// 		this.value = value;
// 		this.left = left;
// 		this.right = right;
// 	}
// }


function prepare() {
	instructions = data[0].split('');
	for (let i = 2; i < data.length; i++) {
		console.log('data[i]', data[i]);
	}
}

function run() {
	prepare();
}
run();