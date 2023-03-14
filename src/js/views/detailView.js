class DetailView {
	_header = document.querySelector('.main__header__searchSection');
	_section1 = document.querySelector('.main__section1');
	_section2 = document.querySelector('.main__Section2');
	_searchSection = document.querySelector('.main__searchResults');
	_body = document.querySelector('body');

	toggledisplay() {
		[this._header, this._section1, this._section2, this._searchSection].forEach(
			(ele) => ele.classList.toggle('hide')
		);
	}

	addHandlerClick(handler) {
		this._body.addEventListener('click', (e) => {
			const container = e.target.closest('.countryContainer');
			if (!container) return;
			console.log(container);
			const name = container.children[1].children[0].textContent;
			console.log(name);
			handler(name);
		});
	}
}

export default new DetailView();
