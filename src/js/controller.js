import * as model from './model.js';
import countriesView from './view.js/countriesView.js';
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

const init = async function() {
 controlCountries();
}
init();