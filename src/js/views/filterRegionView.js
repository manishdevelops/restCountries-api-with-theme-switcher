import View from './View';

class FilterReionView extends View {
	_regions = document.querySelectorAll('.region');
	_regionsContainer = document.querySelector('.dropdown-items');
	_data;
	_parentElement = document.querySelector('.main__section1');

	render(data) {
		this._data = data;
		console.log(this._data);
		// this._clear();
		const markup = this._generateMarkUp();
		this._parentElement.insertAdjacentHTML('beforeend', markup);
		this.createObserver();
	}

	addHandlerFilterRegion(handler) {
		this._regionsContainer.addEventListener('click', (e) => {
			const btn = e.target.closest('.region');
			if (!btn) return;
			console.log(btn);
			const regionIndex = +btn.dataset.index;
			const regionName = btn.dataset.region;
			this._manageActiveRegion(regionIndex);
			console.log(regionName);
			console.log(regionIndex);
			handler(regionName);
		});
	}

	clear() {
		this._parentElement.innerHTML = '';
	}

	clearSpinner() {
		document.querySelector('.spinnerContainer').remove();
	}

	renderSpinner() {
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
    `;
	}

	_manageActiveRegion(regionIndex) {
		this._regions.forEach((list) => list.classList.remove('region-active'));
		this._regions[regionIndex].classList.add('region-active');
	}
}

export default new FilterReionView();
