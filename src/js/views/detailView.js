import View from './View';

class DetailView extends View {
	_data;
	_header = document.querySelector('.main__header');
	_section1 = document.querySelector('.main__section1');
	_section2 = document.querySelector('.main__Section2');
	_searchSection = document.querySelector('.main__searchResults');
	_body = document.querySelector('body');
	parentElement = document.querySelector('.detail');
	_backBtn = document.querySelector('backBtn');
	_mainHeading = document.querySelector('.detail__header__heading');
	_border = document.querySelector('.border-country');

	render(data) {
		this.clear();
		this._data = data;
		console.log(this._data.borders);
		const detailMarkup = this._generateMarkUpPreview(this._data);
		this.parentElement.insertAdjacentHTML('afterbegin', detailMarkup);
		const borderMarkUp = this._borderMarkUp();
		document
			.querySelector('.borders')
			.insertAdjacentHTML('afterbegin', borderMarkUp);
	}

	addHandlerCountryClick(handler) {
		this._body.addEventListener('click', (e) => {
			const container = e.target.closest('.countryContainer');
			if (!container) return;
			this._detailPage('100vh');
			const name = container.children[1].children[0].textContent;
			this.hideDisplay();
			handler(name);
		});
	}

	addHandlerBack(hander) {
		this._body.addEventListener('click', (e) => {
			const btn = e.target.closest('.backBtn');
			console.log(btn);
			if (!btn) return;
			this.clear();
			this._detailPage('0vh');
			hander();
		});
	}

	addHandlerReload(handler) {
		this._body.addEventListener('click', (e) => {
			const btn = e.target.closest('.detail__header__heading');
			if (!btn) return;
			handler();
		});
	}

	addHandlerTheme(handler) {
		this._body.addEventListener('click', (e) => {
			const btn = e.target.closest('.detail__header--themeToggle');
			if (!btn) return;
			handler();
		});
	}

	addHandlerBorder(handler) {
		this._body.addEventListener('click', (e) => {
			const btn = e.target.closest('.border-country');
			console.log(btn);
			if (!btn) return;
			const country = btn.textContent;
			console.log(country);
			handler(country);
		});
	}

	hideDisplay() {
		[this._header, this._section1, this._section2, this._searchSection].forEach(
			(ele) => ele.classList.toggle('hide')
		);
	}

	clear() {
		this.parentElement.innerHTML = '';
	}

	_borderMarkUp() {
		return this._data.borders.map(this._borderMarkUpPreview).join('');
	}

	_borderMarkUpPreview(borders) {
		return `
		<button class="border-country">
			${borders}
	  	</button>
	  `;
	}

	_detailPage(viewHeight) {
		this.parentElement.style.minHeight = viewHeight;
	}

	_generateBorders(borders) {
		return borders.map((border) => {
			`
		<button class="border-country">
			${border.spilt(' ')[0]}
		</button>
		`.join(' ');
		});
	}

	_generateMarkUpPreview(_data) {
		return `
        <div class="detail__header__themeSection">
					<button class="detail__header__heading">Where in this world?</button>
					<button class="detail__header--themeToggle">
					  <box-icon class="moon" name='moon' animation='flashing' flip='horizontal' ></box-icon>
					  Dark Mode
					</button>
				  </div>
				  <div class="detail__backBtn">
					<button class="backBtn">
					  <box-icon class="arrow-back" name='arrow-back' animation='fade-right' ></box-icon>
					  Back
					</button>
				  </div>
				  <section class="detail__country">
					<figure class="detail__countryFlag">
					  <img class="country-flag" src="${this._data.flag}" alt="country-flag">
					</figure>
					<div class="detail__info">
					  <p class="countryName">${this._data.name}</p>
					  <div class="detail__country-info">
						<div class="detail__country-info1">
						  <p class="nativeName"><span>Native Name: </span> <span>${
								this._data.nativeName
							}</span></p>
						  <p class="population"><span>Population: </span> <span>${
								this._data.population
							}</span></p>
						  <p class="Region"><span>Region: </span> <span>${this._data.region}</span></p>
						  <p class="SubRegion"><span>Sub Region: </span> <span>${
								this._data.subRegion
							}</span></p>
						  <p class="capital"><span>Capital: </span> <span>${
								this._data.capital
							}</span></p>
						</div>
						<div class="detail__country-info2">
						  <p class="topLevelDomain"><span>Top Level Domain: </span> <span>${
								this._data.topLevelDomain
							}</span></p>
						  <p class="currency"><span>Currencies: </span> <span>${
								this._data.currencies
									? this._data.currencies.map((currency) => currency.name)
									: ''
							}</span></p>
						  <p class="languages"><span>Languages: </span> <span>${
								this._data.languages
									? this._data.languages.map((lang) => ' '.concat(lang.name))
									: ''
							}</span></p>
						</div>
					  </div>
					  <div class="detail__borders">
						<p>Border Countries:</p>
						<div class="borders">
						
						   
						</div>
					  </div>
					</div>
				  </section>
        `;
	}
}

export default new DetailView();
