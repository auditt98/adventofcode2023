const readTextFileSync = require('../file_read.js');
const split = require('../split.js');

const input = readTextFileSync('./day8_input.txt')
const data = split(input, '\n');
let instructions = [];
const leftMap = {}
const rightMap = {}

function prepareMap() {
	for (let i = 2; i < data.length; i++) {
		const splitted = data[i].split(' = ');
		const startNode = splitted[0];
		const endNode = splitted[1].replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '').split(',');
		leftMap[startNode] = endNode[0];
		rightMap[startNode] = endNode[1];
	}
}

function prepareInstruction() {
	instructions = data[0].split('');
}

function prepare() {
	prepareMap();
	prepareInstruction();
	console.log('leftMap', leftMap);
	console.log("rightMap", rightMap);
	console.log("instructions", instructions);
}

function translateInstruction(instruction, node) {
	if (instruction === "L") {
		return leftMap[node];
	}
	return rightMap[node];
}

function calculate() {
	let steps = 0;
	let stop = false;
	let index = 0;
	let currentNode = null;
	while (!stop) {
		if (currentNode === "ZZZ") {
			stop = true;
			continue;
		}
		if (index === instructions.length) {
			index = 0;
			continue;
		}
		const instruction = instructions[index];
		if (steps === 0) {
			currentNode = translateInstruction(instruction, "AAA");
			steps++;
		} else {
			currentNode = translateInstruction(instruction, currentNode);
			steps++;
		}
		index++;
	}
	console.log('steps', steps);
	return steps;
}

function run() {
	prepare();
	calculate();
}
run();