import View from './views/View';

class MoreFilterRegionView extends View {
	_data;
	parentElement = document.querySelector('.main__Section2');

	//data = page
	render(data) {
		this.clear();
		this._data = data;
		console.log(this._data);
		this._generateMarkup();
	}

	addHandlerClick(handler) {
		this.parentElement.addEventListener('click', (e) => {
			const btn = e.target.closest('.region-load-more-btn');
			console.log(btn);
			if (!btn) return;
			const nextPage = +btn.dataset.nextpage;
			console.log(nextPage);
			this.clear();
			this.renderPrePageLoader();
			setTimeout(function () {
				handler(nextPage);
			}, 1000);
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
		console.log(this._data.regions[this._data.selectedRegion.region].length);
		console.log('num of pages' + numPages);
		console.log('current Page' + curPage);
		// console.log('total countries' + this._data.countries.length);
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
