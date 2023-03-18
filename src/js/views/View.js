export default class View {
	_countries;
	_countryObserver;

	renderPrePageLoader() {
		const markup = `
			<div class = "pre-page-loader-animation">
				<div class = "loader load"></div>
			</div>
		`;
		this.parentElement.insertAdjacentHTML('afterbegin', markup);
	}

	renderSpinner() {
		const markup = `
      <div class="spinnerContainer">
        <box-icon class="spinner" name='loader-circle' animation='spin' ></box-icon>
      </div>
    `;
		this.clear();
		this.parentElement.insertAdjacentHTML('afterbegin', markup);
	}

	renderTimeoutError(err) {
		console.log(err);
		const markup = `
				<div class="error">
					<box-icon class="error-icon" name='error' animation='flashing' ></box-icon>
					<p class="errorMessage">${err}</p>
				</div>
		`;
		this.parentElement.insertAdjacentHTML('beforeend', markup);
	}

	clearSearchResults() {
		this._parentElement.innerHTML = '';
	}

	generateMarkUpPreview(_data) {
		return `
			<a href="#">
			<div class="countryContainer">
				<figure class="countryFlagContainer">
				<img class="countryFlag" src="${_data.flag}" alt="${_data.countryName}-flag">
				</figure>
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

	reloadPage() {
		location.reload();
	}

	themeChange() {
		document.querySelector('body').classList.toggle('dark-theme');
		document.querySelector('.detail').classList.toggle('dark-theme');
	}

	//observer
	createObserver() {
		this._countries = document.querySelectorAll('.countryContainer');
		this._addObserver();
	}

	_revealCountry(entries, observer) {
		const [entry] = entries;
		if (!entry.isIntersecting) return;
		entry.target.classList.remove('country--hidden');
		observer.unobserve(entry.target);
	}

	_addObserver() {
		const countryObserver = new IntersectionObserver(this._revealCountry, {
			root: null,
			threshold: 0.15,
		});

		//Applying observer to each country. and hiding them
		this._countries.forEach(function (country) {
			countryObserver.observe(country);
			country.classList.add('country--hidden');
		});
	}
}
