class ThemeView {
  _parentElement = document.querySelector('body');
  _themeBtn = document.querySelector('.main__header--themeToggle');

  addHandlerTheme(handler) {
    this._themeBtn.addEventListener('click', handler);
  }

  themeChange() {
    this._parentElement.classList.toggle('dark-theme');
  }
}

export default new ThemeView();