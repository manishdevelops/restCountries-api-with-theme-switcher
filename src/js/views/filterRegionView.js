import View from './View';

class FilterReionView extends View {
	_data;
	_regions = document.querySelectorAll('.region');
	_regionsContainer = document.querySelector('.dropdown-items');
	_parentElement = document.querySelector('.main__section1');

	render(data) {
		this._data = data;
		const markup = this._generateMarkUp();
		this._parentElement.insertAdjacentHTML('beforeend', markup);
		this.createObserver();
	}

	addHandlerFilterRegion(handler) {
		this._regionsContainer.addEventListener('click', (e) => {
			const btn = e.target.closest('.region');
			if (!btn) return;
			const regionIndex = +btn.dataset.index;
			const regionName = btn.dataset.region;
			this._manageActiveRegion(regionIndex);
			handler(regionName);
		});
	}

	clear() {
		this._parentElement.innerHTML = '';
	}

	_manageActiveRegion(regionIndex) {
		this._regions.forEach((list) => list.classList.remove('region-active'));
		this._regions[regionIndex].classList.add('region-active');
	}

	_generateMarkUp() {
		return this._data.map(this.generateMarkUpPreview).join('');
	}
}

export default new FilterReionView();
