import * as model from './model.js';
import countriesView from './views/countriesView.js';
import themeView from './views/themeView.js';
import regionDropdownView from './views/regionDropdownView.js';
import moreCountriesView from './views/moreCountriesView.js';
import reloadView from './views/reloadView.js';
import filterRegionView from './views/filterRegionView.js';
import moreFilterRegionView from './moreFilterRegionView.js';
import searchCountryView from './views/searchCountryView.js';
import detailView from './views/detailView.js';
import 'boxicons';

const controlCountries = async () => {
	try {
		countriesView.renderSpinner();
		await model.loadCountries();
		const firstPageData = model.getResultsPage();
		countriesView.render(firstPageData);
		moreCountriesView.render(model.state);
		searchCountryView.render(model.state.countries);
		countriesView.clearSpinner();
	} catch (err) {
		console.log(err);
		countriesView.clear();
		countriesView.renderTimeoutError(err);
	}
};

const controlMoreCountries = (nextPage) => {
	moreCountriesView.clear();
	searchCountryView.clearSearchResults();
	const renderMoreCountries = model.getResultsPage(nextPage);
	countriesView.render(renderMoreCountries);
	moreCountriesView.render(model.state);
};

const controlTheme = () => {
	themeView.themeChange();
};

const controlDropdown = () => {
	regionDropdownView.toggleRegionDropdown();
};

const controlDropdownBlur = () => {
	regionDropdownView.toggleBlurBg();
};

const controlFilterRegion = (regionName) => {
	searchCountryView.clearSearchResults();
	filterRegionView.clear();
	model.setSelectedRegion(regionName);
	const firstRegionPage = model.getRegionResultsPage();
	filterRegionView.render(firstRegionPage);
	moreFilterRegionView.render(model.state);
};

const controlMoreFilterRegion = (nextPage) => {
	searchCountryView.clearSearchResults();
	const moreFilteredData = model.getRegionResultsPage(nextPage);
	filterRegionView.render(moreFilteredData);
	moreFilterRegionView.render(model.state);
};

const controlReload = () => {
	reloadView.reloadPage();
};

const controlSearchCountry = (name) => {
	searchCountryView.hidePreviousData('none');
	searchCountryView.searchCountry(name);
};

const controlCountryDetails = async (name) => {
	try {
		detailView.renderSpinner();
		await model.loadCountries(name);
		const bord = model.detailCountry.borders;
		console.log(bord);
		bord && (await model.loadBorders(bord));
		detailView.render(model.detailCountry);
	} catch (err) {
		detailView.clear();
		detailView.renderTimeoutError(err);
	}
};

const controlDisplay = () => {
	detailView.hideDisplay();
};

const controlDetailTheme = () => {
	detailView.themeChange();
};

const controlBorderCountry = (country) => {
	console.log(country);
	controlCountryDetails(country.trim());
};

const init = async () => {
	await controlCountries();
	themeView.addHandlerTheme(controlTheme);
	regionDropdownView.addHandlerDropdown(controlDropdown);
	regionDropdownView.addHandlerDropdownBlur(controlDropdownBlur);
	filterRegionView.addHandlerFilterRegion(controlFilterRegion);
	moreFilterRegionView.addHandlerClick(controlMoreFilterRegion);
	moreCountriesView.addHandlerClick(controlMoreCountries);
	reloadView.addHandlerReload(controlReload);
	searchCountryView.addHandlerInput(controlSearchCountry);
	detailView.addHandlerCountryClick(controlCountryDetails);
	detailView.addHandlerBack(controlDisplay);
	detailView.addHandlerReload(controlReload);
	detailView.addHandlerTheme(controlDetailTheme);
	detailView.addHandlerBorder(controlBorderCountry);
};
init();
