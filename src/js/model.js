import { API_URL, RES_PER_PAGE, TIMEOUT_SEC } from './config.js';

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
};

export const loadCountries = async () => {
	try {
		// const res = await fetch(API_URL);
		const fetchPro = fetch(API_URL);
		const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
		if (!res.ok) throw new Error(`Something went wrong (${res.status})`);
		const data = await res.json();
		console.log(data);
		state.countries = data.map((country) => ({
			countryName: country.name,
			population: country.population,
			region: country.region,
			capital: country.capital,
			flag: country.flag,
		}));
		console.log(state.countries);
		// return state.countries.slice(0, state.resultsPerPage);
		// return state.countries;
	} catch (err) {
		throw new Error(`Opps! ${err.message}`);
	}
};

export const getResultsPage = function (page = state.page) {
	state.page = page;
	const start = (page - 1) * state.resultsPerPage;
	const end = page * state.resultsPerPage;
	console.log(state.countries);
	console.log(start, end);
	return state.countries.slice(start, end);
};
