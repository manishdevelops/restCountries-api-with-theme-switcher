class FilterRegionView {
  _regionBtn = document.querySelector('.dropdown-btn');
  _AllRegions = document.querySelectorAll('.region-list');


  addHandlerRegion(handler) {
    this._dropdownBtn.addEventListener('click', handler);
  }

  filterRegion() {

  }
}