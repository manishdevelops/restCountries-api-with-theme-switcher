import * as model from './model.js';
import countriesView from './views/countriesView.js';
import themeView from './views/themeView.js';
import regionDropdownView from './views/regionDropdownView.js';
import moreCountriesView from './views/moreCountriesView.js';
import reloadView from './views/reloadView.js';
import filterRegionView from './views/filterRegionView.js';
import moreFilterRegionView from './moreFilterRegionView.js';
import 'boxicons';

const controlCountries = async function () {
	try {
		countriesView.renderSpinner();
		await model.loadCountries();
		const firstPageData = model.getResultsPage();
		countriesView.render(firstPageData);
		moreCountriesView.render(model.state);
		countriesView.clearSpinner();
		console.log(firstPageData);
	} catch (err) {
		console.log(err);
		countriesView.renderTimeoutError(err);
	}
};

const controlMoreCountries = (nextPage) => {
	moreCountriesView.clear();
	const renderMoreCountries = model.getResultsPage(nextPage);
	countriesView.render(renderMoreCountries);
	moreCountriesView.render(model.state);
	// moreCountriesView.render();
	// console.log(a);
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
	filterRegionView.clear();
	model.setSelectedRegion(regionName);
	const firstRegionPage = model.getRegionResultsPage();
	console.log(firstRegionPage);
	filterRegionView.render(firstRegionPage);
	moreFilterRegionView.render(model.state);
};

const controlMoreFilterRegion = (nextPage) => {
	// model.setSelectedRegion(nextPage);
	// moreFilterRegionView.clear();
	console.log(nextPage);
	const moreFilteredData = model.getRegionResultsPage(nextPage);
	console.log(moreFilteredData);
	filterRegionView.render(moreFilteredData);
	moreFilterRegionView.render(model.state);
};

const controlReload = function () {
	reloadView.reloadPage();
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
};
init();
