import View from './View.js';

class CountriesView extends View {
	_data;
	parentElement = document.querySelector('.main__section1');

	render(data) {
		this._data = data;
		const markup = this._generateMarkUp();
		this.parentElement.insertAdjacentHTML('beforeend', markup);
		this.createObserver();
	}

	clear() {
		this.parentElement.innerHTML = '';
	}

	clearSpinner() {
		document.querySelector('.spinnerContainer').remove();
	}

	_generateMarkUp() {
		return this._data.map(this.generateMarkUpPreview).join('');
	}
}

export default new CountriesView();
