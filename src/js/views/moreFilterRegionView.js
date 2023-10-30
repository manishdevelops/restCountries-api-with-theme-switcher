import View from './View';
import { PRE_PAGE_LOAD } from '/src/js/config.js';

class MoreFilterRegionView extends View {
	_data;
	parentElement = document.querySelector('.main__Section2');

	//data = page
	render(data) {
		this.clear();
		this._data = data;
		this._generateMarkup();
	}

	addHandlerClick(handler) {
		this.parentElement.addEventListener('click', (e) => {
			const btn = e.target.closest('.region-load-more-btn');
			if (!btn) return;
			const nextPage = +btn.dataset.nextpage;
			this.clear();
			this.renderPrePageLoader();
			setTimeout(function () {
				handler(nextPage);
			}, PRE_PAGE_LOAD);
		});
	}

	clear() {
		this.parentElement.innerHTML = '';
	}

	_generateMarkup() {
		const curPage = this._data.selectedRegion.page;
		const numPages = Math.ceil(
			this._data.regions[this._data.selectedRegion.region].length /
				this._data.selectedRegion.resultsPerPage
		);
		if (curPage < numPages) {
			const markup = `
      		<button data-nextpage = "${
						curPage + 1
					}" class="region-load-more-btn">Load more</button>
      	`;
			this.clear();
			this.parentElement.insertAdjacentHTML('afterbegin', markup);
		}
	}
}

export default new MoreFilterRegionView();
