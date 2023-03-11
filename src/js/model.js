import {
	API_URL,
	RES_PER_PAGE,
	TIMEOUT_SEC,
	REGION_RES_PER_PAGE,
	PRE_PAGE_LOAD,
} from './config.js';

const timeout = (s) => {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * PRE_PAGE_LOAD);
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
		const fetchPro = fetch(API_URL);
		const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
		if (!res.ok) throw new Error(`Something went wrong (${res.status})`);
		const data = await res.json();
		state.countries = data.map((country) => ({
			countryName: country.name,
			population: country.population,
			region: country.region,
			capital: country.capital,
			flag: country.flag,
		}));
		state.regions.All = state.countries;
		state.countries.filter(function (country) {
			country.region === 'Africa' && state.regions.Africa.push(country);
			country.region === 'Americas' && state.regions.America.push(country);
			country.region === 'Asia' && state.regions.Asia.push(country);
			country.region === 'Europe' && state.regions.Europe.push(country);
			country.region === 'Oceania' && state.regions.Oceania.push(country);
		});
	} catch (err) {
		throw new Error(`Opps! ${err.message}`);
	}
};

export const setSelectedRegion = function (regionName) {
	state.selectedRegion.region = regionName;
	state.selectedRegion.page = 1;
};

export const getResultsPage = function (page = state.page) {
	state.page = page;
	const start = (page - 1) * state.resultsPerPage;
	const end = page * state.resultsPerPage;
	return state.countries.slice(start, end);
};

export const getRegionResultsPage = function (
	page = state.selectedRegion.page
) {
	state.selectedRegion.page = page;
	const start = (page - 1) * state.selectedRegion.resultsPerPage;
	const end = page * state.selectedRegion.resultsPerPage;
	return state.regions[state.selectedRegion.region].slice(start, end);
};
