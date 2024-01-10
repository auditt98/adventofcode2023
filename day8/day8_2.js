const readTextFileSync = require('../file_read.js');
const split = require('../split.js');

const input = readTextFileSync('./day8_input.txt')
const data = split(input, '\n');
let instructions = [];
const leftMap = {}
const rightMap = {}
const nodeEndsWithA = {};
const nodeEndsWithZ = {};

function prepareMap() {
	for (let i = 2; i < data.length; i++) {
		const splitted = data[i].split(' = ');
		const startNode = splitted[0];
		if (startNode.endsWith('A')) {
			nodeEndsWithA[startNode] = true;
		}
		if (startNode.endsWith('Z')) {
			nodeEndsWithZ[startNode] = true;
		}
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
	// console.log("instructions", instructions);
	console.log("nodeEndsWithA", nodeEndsWithA);
	console.log("nodeEndsWithZ", nodeEndsWithZ);
}

function translateInstruction(instruction, node) {
	if (instruction === "L") {
		return leftMap[node];
	}
	return rightMap[node];
}

function calculate(startNode) {
	let steps = 0;
	let stop = false;
	let index = 0;
	let currentNode = null;
	while (!stop) {
		if (nodeEndsWithZ[currentNode]) {
			console.log("")
			stop = true;
			continue;
		}
		if (index === instructions.length) {
			index = 0;
			continue;
		}
		const instruction = instructions[index];
		if (steps === 0) {
			currentNode = translateInstruction(instruction, startNode);
			steps++;
		} else {
			currentNode = translateInstruction(instruction, currentNode);
			steps++;
		}
		index++;
	}
	return steps;
}

function run() {
	prepare();
	let totalSteps = 0;
	for (const node in nodeEndsWithA) {
		const nodeSteps = calculate(node);
		totalSteps += nodeSteps;
		console.log('nodeSteps', nodeSteps, node);
	}
	console.log('totalSteps', totalSteps);
}
run();