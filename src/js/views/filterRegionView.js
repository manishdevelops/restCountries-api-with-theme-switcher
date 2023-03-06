class FilterRegionView {
	_parentBtn = document.querySelector('.dropdown-btn');
	_regionsNames = document.querySelectorAll('.region');
	_regionsContainer = document.querySelector('.dropdown-items');
	_bgBlur = document.querySelector('.body-blur');

	addHandlerRegion(handler) {
		this._parentBtn.addEventListener('click', () => {
			this._toggleRegionDropdown();
		});
		this._bgBlur.addEventListener('click', () => {
			this._toggleBlurBg();
		});
	}

	_toggleRegionDropdown() {
		this._regionsContainer.classList.toggle('dropdown-toggle-desk');
		this._regionsContainer.classList.toggle('dropdown-items-tab');
		this._bgBlur.classList.toggle('bg-overlay-tab');
	}

	_toggleBlurBg() {
		this._bgBlur.classList.remove('bg-overlay-tab');
		this._regionsContainer.classList.toggle('dropdown-items-tab');
		this._regionsContainer.classList.toggle('dropdown-toggle-desk');
	}

	filterRegion() {}
}

export default new FilterRegionView();
