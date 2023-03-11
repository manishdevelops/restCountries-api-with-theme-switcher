import View from './View.js';

class CountriesView extends View {
	_data;
	_parentElement = document.querySelector('.main__section1');

	render(data) {
		this._data = data;
		const markup = this._generateMarkUp();
		this._parentElement.insertAdjacentHTML('beforeend', markup);
		this.createObserver();
	}

	_clear() {
		this._parentElement.innerHTML = '';
	}

	clearSpinner() {
		document.querySelector('.spinnerContainer').remove();
	}

	renderTimeoutError(err) {
		console.log(err);
		const markup = `
				<div class="main__section2__error">
					<box-icon class="error-icon" name='error' animation='flashing' ></box-icon>
					<p class="errorMessage">${err}</p>
				</div>
		`;
		this._clear();
		this._parentElement.insertAdjacentHTML('beforeend', markup);
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
		return this._data.map(this.generateMarkUpPreview).join('');
	}
}

export default new CountriesView();
