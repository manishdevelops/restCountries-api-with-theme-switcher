import View from './View.js';

class CountriesView extends View {
  _data;
  _parentElement = document.querySelector('.main__section1');
  

  render(data) {
    this._data = data;
    const markup = this._generateMarkUp();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    this.createObserver();
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _renderSpinner() {
    const markup = `
    <div class="spinnerContainer">
    <box-icon class="spinner" name='loader-circle' animation='spin' ></box-icon>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkUp() {
    console.log(this._data);
    return this._data.map(this._generateMarkUpPreview).join('');
  }

  _generateMarkUpPreview(_data) {
    return `
    <a href=#${_data.countryName}>
      <div class="countryContainer">
        <div class="countryFlagContainer">
          <img class="countryFlag" src="${_data.flag}" alt="Country flag">
        </div>
        <div class="countryDetails">
          <p class="countryName">${_data.countryName}</p>
          <p class="countryPopulation"><span>Population:</span>${_data.population}</p>
          <p class="countryRegion"><span>Region:</span><span>${_data.region}</span></p>
          <p class="countryCapital"><span>Capital:</span>${_data.capital}</p>
        </div>
    </div>
    </a>

    `
  }

}

export default new CountriesView();