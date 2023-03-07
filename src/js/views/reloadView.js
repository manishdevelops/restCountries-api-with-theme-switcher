class ReloadView {
	_mainHeading = document.querySelector('.main__header__headingBtn');

	addHandlerReload(handler) {
		this._mainHeading.addEventListener('click', handler);
	}

	reloadPage() {
		location.reload();
	}
}

export default new ReloadView();
