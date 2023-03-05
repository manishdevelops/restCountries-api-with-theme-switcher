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
