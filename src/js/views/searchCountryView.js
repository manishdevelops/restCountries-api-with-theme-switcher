import View from './View';

class SearchCountryView extends View {
	_data;
	_parentElement = document.querySelector('.main__searchResults');
	_countryNameInput = document.querySelector('#inputCountry');

	render(data) {
		this._data = data;
		this.createObserver();
	}

	_renderMessage() {
		const markup = `
		<p class="main__searchMessage">Sorry 🥲 No results found!'</p>
		`;
		this._parentElement.insertAdjacentHTML('beforeend', markup);
	}

	addHandlerInput(handler) {
		this._countryNameInput.addEventListener('keyup', () => {
			const search = this._countryNameInput.value;
			this.clearSearchResults();
			handler(search);
		});
	}

	hidePreviousData(val) {
		const countries = document.querySelectorAll('.countryContainer');
		console.log(this._parentElement.children.length);
		const sec2 = document.querySelector('.main__Section2');
		countries.forEach(function (country) {
			country.style.display = val;
		});
		sec2.style.display = val === 'block' ? 'flex' : 'none';
	}

	searchCountry(name) {
		if (name === '') {
			this.hidePreviousData('block');
			this.clearSearchResults();
			return;
		}
		this._data.forEach((country) => {
			const { countryName } = country;
			if (countryName.toLowerCase().includes(name.toLowerCase())) {
				const markup = this._generateMarkUpPreview(country);
				this._parentElement.insertAdjacentHTML('afterbegin', markup);
			}
		});
		console.log(this._parentElement.children.length);
		this._parentElement.childNodes.length === 0 && this._renderMessage();
	}

	_generateMarkUpPreview(country) {
		return `
	<a href="#${country.countryName}">
	  <div class="countryContainer">
	    <div class="countryFlagContainer">
	      <img class="countryFlag" src="${country.flag}" alt="Country flag">
	    </div>
	    <div class="countryDetails">
	      <p class="countryName">${country.countryName}</p>
	      <p class="countryPopulation"><span>Population:</span>${country.population}</p>
	      <p class="countryRegion"><span>Region:</span><span>${country.region}</span></p>
	      <p class="countryCapital"><span>Capital:</span>${country.capital}</p>
	    </div>
	</div>
	</a>
	`;
	}
}

export default new SearchCountryView();
