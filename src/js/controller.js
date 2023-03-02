import * as model from './model.js';
import countriesView from './view.js/countriesView.js';
import themeView from './view.js/themeView.js';
import filterRegionView from './view.js/themeView.js';
import 'boxicons'

const controlCountries = async function() {
  try {
    countriesView._renderSpinner();
    const firstPageData = await model.loadCountries();
    countriesView.render(firstPageData);
    console.log(firstPageData)
  } catch(err) {
    console.log(err);
  }
}

const themeControl = function() {
  themeView.themeChange();
}

const regionControl = function() {
  filterRegionView.filterRegion();
}

const init = async function() {
 controlCountries();
 themeView.addHandlerTheme(themeControl);
//  filterRegionView.addHandlerRegion(regionControl);
}
init();