class FilterRegionView {
	_parentBtn = document.querySelector('.dropdown-btn');
	_regionsContainer = document.querySelector('.dropdown-items');
	_bgBlur = document.querySelector('.body-blur');

	addHandlerDropdown(handler) {
		this._parentBtn.addEventListener('click', handler);
		this._regionsContainer.addEventListener('click', (e) => {
			const btn = e.target.closest('.region');
			if (!btn) return;
			handler();
		});
	}

	addHandlerDropdownBlur(handler) {
		this._bgBlur.addEventListener('click', handler);
	}

	toggleRegionDropdown() {
		this._regionsContainer.classList.toggle('dropdown-toggle-desk');
		this._regionsContainer.classList.toggle('dropdown-items-tab');
		this._bgBlur.classList.toggle('bg-overlay-tab');
	}

	toggleBlurBg() {
		this._bgBlur.classList.remove('bg-overlay-tab');
		this._regionsContainer.classList.toggle('dropdown-items-tab');
		this._regionsContainer.classList.toggle('dropdown-toggle-desk');
	}
}

export default new FilterRegionView();
