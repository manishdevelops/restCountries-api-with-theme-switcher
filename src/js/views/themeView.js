import View from './View';

class ThemeView extends View {
	_themeBtn = document.querySelector('.main__header--themeToggle');

	addHandlerTheme(handler) {
		this._themeBtn.addEventListener('click', handler);
	}
}

export default new ThemeView();
