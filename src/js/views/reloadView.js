import View from './View';

class ReloadView extends View {
	_mainHeading = document.querySelector('.main__header__headingBtn');

	addHandlerReload(handler) {
		this._mainHeading.addEventListener('click', handler);
	}

	reloadPage() {
		location.reload();
	}
}

export default new ReloadView();
