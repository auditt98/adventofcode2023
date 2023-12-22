const readTextFileSync = require('./file_read.js');
const split = require('./split.js');

const input = readTextFileSync('./day5_input1.txt')
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

const seedToSoilObj = {}
const soilToFertilizerObj = {}
const fertilizerToWaterObj = {}
const waterToLightObj = {}
const lightToTemperatureObj = {}
const temperatureToHumidityObj = {}
const humidityToLocationObj = {}

function buildMap() {
	let section = "";
	data.forEach(line => {
		if (line === "") return
		const key = line.split(':')[0]; // Extract the key part before the colon
			switch (key) {
					// case 'seeds':
					// 	console.log(line.split(':'));
					// 	seeds = line.split(':')[1].trim().split(' ').map(x => Number(x));
					// 	return
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

	console.log('seeds', seeds);
	console.log('seedToSoilMap', seedToSoilMap);
	console.log('soilToFertilizerMap', soilToFertilizerMap);
	console.log('fertilizerToWaterMap', fertilizerToWaterMap);
	console.log('waterToLightMap', waterToLightMap);
	console.log('lightToTemperatureMap', lightToTemperatureMap);
	console.log('temperatureToHumidityMap', temperatureToHumidityMap);
	console.log('humidityToLocationMap', humidityToLocationMap);
}

function mapToObject(srcArray, destArray, finalObject) {
	srcArray.forEach((item) => {
		const found = destArray.find(x => {
			if (x[1] <= item && x[1] + x[2] >= item) {
				return x;
			}
		})
		if (found) {
			finalObject[`${item}`] = found[0] + (item - found[1]);
		} else {
			finalObject[`${item}`] = item;
		}
	})
	return finalObject
}

function findLowestValue(obj) {
	const values = Object.values(obj);
	return Math.min(...values);
}

function run() {
	buildMap()
	mapToObject(seeds, seedToSoilMap, seedToSoilObj)
	mapToObject(Object.values(seedToSoilObj), soilToFertilizerMap, soilToFertilizerObj)
	mapToObject(Object.values(soilToFertilizerObj), fertilizerToWaterMap, fertilizerToWaterObj)
	mapToObject(Object.values(fertilizerToWaterObj), waterToLightMap, waterToLightObj)
	mapToObject(Object.values(waterToLightObj), lightToTemperatureMap, lightToTemperatureObj)
	mapToObject(Object.values(lightToTemperatureObj), temperatureToHumidityMap, temperatureToHumidityObj)
	mapToObject(Object.values(temperatureToHumidityObj), humidityToLocationMap, humidityToLocationObj)
	console.log('~~~~~~')
	console.log('\n')
	console.log('seedToSoilObj', seedToSoilObj)	
	console.log('soilToFertilizerObj', soilToFertilizerObj)	
	console.log('fertilizerToWaterObj', fertilizerToWaterObj)
	console.log('waterToLightObj', waterToLightObj)
	console.log('lightToTemperatureObj', lightToTemperatureObj)
	console.log('temperatureToHumidityObj', temperatureToHumidityObj)
	console.log('humidityToLocationObj', humidityToLocationObj)
	console.log(findLowestValue(humidityToLocationObj))
}
run();