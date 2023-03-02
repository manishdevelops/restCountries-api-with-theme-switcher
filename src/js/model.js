import { API_URL, RES_PER_PAGE } from './config.js';

export const state = {
  countries: [],
  resultsPerPage: RES_PER_PAGE,
  page: 1,
}

export const loadCountries = async function() {
  try {
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error(`Something went wrong (${res.status})`);
    const data = await res.json();
    // console.log(data[0].flag);
    state.countries = data.map( country => {
      return {
        countryName: country.name,
        population: country.population,
        region: country.region,
        capital: country.capital,
        flag: country.flag,
      }
    });
    console.log(state.countries);
    return state.countries.slice(0, state.resultsPerPage);
  } catch(err) {
    console.log(err);
  }
}

export const getResultsPage = function(page = state.page) {
  state.page = page;
  const start = (page - 1) * state.resultsPerPage;
  const end = page * state.resultsPerPage; 
  console.log(start, end)
  // console.log(state.countries)
  return state.countries.slice(start, end);
}