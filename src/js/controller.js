import * as model from './model.js';
import countriesView from './views/countriesView.js';
import themeView from './views/themeView.js';
import filterRegionView from './views/filterRegionView.js';
import moreCountriesView from './views/moreCountriesView.js';
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

const controlTheme = () => {
	themeView.themeChange();
};

const controlRegion = () => {
	filterRegionView.filterRegion();
};

const controlMoreCountries = (nextPage) => {
	moreCountriesView.clear();
	const renderMoreCountries = model.getResultsPage(nextPage);
	countriesView.render(renderMoreCountries);
	moreCountriesView.render(model.state);
	// moreCountriesView.render();
	// console.log(a);
};

const init = async () => {
	await controlCountries();
	themeView.addHandlerTheme(controlTheme);
	filterRegionView.addHandlerRegion(controlRegion);
	moreCountriesView.addHandlerClick(controlMoreCountries);
};
init();
