const readTextFileSync = require('../file_read.js');
const split = require('../split.js');

const input = readTextFileSync('./day5_input.txt')
const data = split(input, '\n');

let seeds = []
//arrays of length 3 arrays [destination, source, length]
const seedToSoilMap = [] 
const soilToFertilizerMap = []
const fertilizerToWaterMap = []
const waterToLightMap = []
const lightToTemperatureMap = []
const temperatureToHumidityMap = []
const humidityToLocationMap = []

function groupInPairs(array) {
	let groupedArray = [];
	for (let i = 0; i < array.length; i += 2) {
			groupedArray.push(array.slice(i, i + 2));
	}
	return groupedArray;
}

function buildMap() {
	let section = "";
	data.forEach(line => {
		if (line === "") return
		const key = line.split(':')[0]; // Extract the key part before the colon
			switch (key) {
					case 'seeds':
						console.log(line.split(':'));
						seeds = line.split(':')[1].trim().split(' ').map(x => Number(x));
						seeds = groupInPairs(seeds);
						return
					case 'seed-to-soil map':
						section = 'seed-to-soil';
						return
					case 'soil-to-fertilizer map':
						section = 'soil-to-fertilizer';
						return
					case 'fertilizer-to-water map':
						section = 'fertilizer-to-water';
						return
					case 'water-to-light map':
						section = 'water-to-light';
						return
					case 'light-to-temperature map':
						section = 'light-to-temperature';
						return
					case 'temperature-to-humidity map':
						section = 'temperature-to-humidity';
						return
					case 'humidity-to-location map':
						section = 'humidity-to-location';
						return
			}
			if (section !== "") {
					switch (section) {
							case 'seed-to-soil':
									seedToSoilMap.push(line.trim().split(' ').map(x => Number(x)));
									break;
							case 'soil-to-fertilizer':
									soilToFertilizerMap.push(line.trim().split(' ').map(x => Number(x)));
									break;
							case 'fertilizer-to-water':
									fertilizerToWaterMap.push(line.trim().split(' ').map(x => Number(x)));
									break;
							case 'water-to-light':
									waterToLightMap.push(line.trim().split(' ').map(x => Number(x)));
									break;
							case 'light-to-temperature':
									lightToTemperatureMap.push(line.trim().split(' ').map(x => Number(x)));
									break;
							case 'temperature-to-humidity':
									temperatureToHumidityMap.push(line.trim().split(' ').map(x => Number(x)));
									break;
							case 'humidity-to-location':
									humidityToLocationMap.push(line.trim().split(' ').map(x => Number(x)));
									break;
					}
			}
	});

	// console.log('seeds', seeds);
	// console.log('seedToSoilMap', seedToSoilMap);
	// console.log('soilToFertilizerMap', soilToFertilizerMap);
	// console.log('fertilizerToWaterMap', fertilizerToWaterMap);
	// console.log('waterToLightMap', waterToLightMap);
	// console.log('lightToTemperatureMap', lightToTemperatureMap);
	// console.log('temperatureToHumidityMap', temperatureToHumidityMap);
	// console.log('humidityToLocationMap', humidityToLocationMap);
}

function translateValue(seed) {
	//loop through soil map
	let soil = seed;
	seedToSoilMap.forEach((item) => {
		//map 0 is soil, 1 is seed, 2 is length
		if (item[1] <= seed && item[1] + item[2] > seed) {
			soil = item[0] + (seed - item[1]);
		}
	})
	//loop through fertilizer map
	let fertilizer = soil;
	soilToFertilizerMap.forEach((item) => {
		if (item[1] <= soil && item[1] + item[2] > soil) {
			fertilizer = item[0] + (soil - item[1]);
		}
	})
	//loop through water map
	let water = fertilizer;
	fertilizerToWaterMap.forEach((item) => {
		if (item[1] <= fertilizer && item[1] + item[2] > fertilizer) {
			water = item[0] + (fertilizer - item[1]);
		}
	})
	//loop through light map
	let light = water;
	waterToLightMap.forEach((item) => {
		if (item[1] <= water && item[1] + item[2] > water) {
			light = item[0] + (water - item[1]);
		}
	})
	//loop through temperature map
	let temperature = light;
	lightToTemperatureMap.forEach((item) => {
		if (item[1] <= light && item[1] + item[2] > light) {
			temperature = item[0] + (light - item[1]);
		}
	})
	//loop through humidity map
	let humidity = temperature;
	temperatureToHumidityMap.forEach((item) => {
		if (item[1] <= temperature && item[1] + item[2] > temperature) {
			humidity = item[0] + (temperature - item[1]);
		}
	})
	//loop through location map
	let location = humidity;
	humidityToLocationMap.forEach((item) => {
		if (item[1] <= humidity && item[1] + item[2] > humidity) {
			location = item[0] + (humidity - item[1]);
		}
	})
	
	return location;
}


function run() {
	buildMap()
	let minLocation = Infinity;
	seeds.forEach((seedRange) => {
		console.log("seedRange", seedRange)
		for (let i = seedRange[0]; i <= seedRange[0] + seedRange[1]; i++) {
			const location = translateValue(i);
			if (location < minLocation) {
				minLocation = location;
			}
		}
	})	
	console.log('minLocation', minLocation)
}
run();