import {
	API_URL,
	RES_PER_PAGE,
	TIMEOUT_SEC,
	REGION_RES_PER_PAGE,
} from './config.js';

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

export const state = {
	countries: [],
	resultsPerPage: RES_PER_PAGE,
	page: 1,
	regions: {
		Africa: [],
		America: [],
		Asia: [],
		Europe: [],
		Oceania: [],
		All: [],
	},
	selectedRegion: {
		resultsPerPage: REGION_RES_PER_PAGE,
		region: '',
		page: 1,
	},
};

export const loadCountries = async () => {
	try {
		// const res = await fetch(API_URL);
		const fetchPro = fetch(API_URL);
		const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
		if (!res.ok) throw new Error(`Something went wrong (${res.status})`);
		const data = await res.json();
		// console.log(data);
		state.countries = data.map((country) => ({
			countryName: country.name,
			population: country.population,
			region: country.region,
			capital: country.capital,
			flag: country.flag,
		}));
		All = state.countries;
		console.log(All);
		// console.log(state.countries);
		// return state.countries.slice(0, state.resultsPerPage);
		// return state.countries;
		state.countries.filter(function (country) {
			// console.log(country.region);
			country.region === 'Africa' && state.regions.Africa.push(country);
			country.region === 'Americas' && state.regions.America.push(country);
			country.region === 'Asia' && state.regions.Asia.push(country);
			country.region === 'Europe' && state.regions.Europe.push(country);
			country.region === 'Oceania' && state.regions.Oceania.push(country);
		});
		console.log(state.regions);
	} catch (err) {
		throw new Error(`Opps! ${err.message}`);
	}
};

export const setSelectedRegion = function (regionName) {
	state.selectedRegion.region = regionName;
	state.selectedRegion.page = 1;
	console.log(state.selectedRegion);
};

export const getResultsPage = function (page = state.page) {
	// console.log(state.regions[regionName]);
	console.log('current page ' + page);
	state.page = page;
	const start = (page - 1) * state.resultsPerPage;
	const end = page * state.resultsPerPage;
	// console.log(state.countries);
	console.log(start, end);
	return state.countries.slice(start, end);
	// return regionName
	// 	? state.regions[regionName].slice(start, end)
	// 	: state.countries.slice(start, end);
};

export const getRegionResultsPage = function (
	page = state.selectedRegion.page
) {
	console.log(state.selectedRegion.region);
	// console.log(state.regions[state.selectedRegion.region]);
	state.selectedRegion.page = page;
	const start = (page - 1) * state.selectedRegion.resultsPerPage;
	const end = page * state.selectedRegion.resultsPerPage;
	console.log('regions page = ', start, end);
	return state.regions[state.selectedRegion.region].slice(start, end);
};
