import './sass/main.scss';
import hitsTpl from './templates/hits.hbs';
import loadMore from './scripts/load-more-btn';

import getRefs from './scripts/get-refs';
import debounce from 'lodash.debounce';
import ApiService from './scripts/apiService';

const refs = getRefs();
const apiService = new ApiService();

// запрос картинки (input)

refs.input.addEventListener('input', debounce(onInputChange, 1000));
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onInputChange(event) {
  apiService.query = event.target.value;

  if (apiService.query.trim() === '') {
    return;
  }

  clearGallery();

  apiService.resetPage();
  apiService.fetchImages().then(addHitsMarkup);
}
// loadMore();

function onLoadMore() {
  apiService.fetchImages().then(addHitsMarkup);
}

function addHitsMarkup(hits) {
  console.log(hits);
  refs.gallery.insertAdjacentHTML('beforeend', hitsTpl(hits));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
