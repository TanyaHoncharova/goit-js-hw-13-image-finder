import './sass/main.scss';
import hitsTpl from './templates/hits.hbs';
import LoadMore from './scripts/load-more-btn';

import getRefs from './scripts/get-refs';
import debounce from 'lodash.debounce';
import ApiService from './scripts/apiService';

const refs = getRefs();


const apiService = new ApiService();

const loadMoreBtn = new LoadMore({
  selector: '[data-action="load-more"]',
  hidden: true,
});

// запрос картинки (input)

refs.input.addEventListener('input', debounce(onInputChange, 500));
loadMoreBtn.refs.button.addEventListener('click', debounce(fetchImage, 1000));

function onInputChange(event) {
  apiService.query = event.target.value;

  if (apiService.query === '') {
    return alert('Enter something');;
  }

  loadMoreBtn.show();
  
  clearGallery();
  apiService.resetPage();
  fetchImage();
}


function fetchImage() {
  loadMoreBtn.disable();
  apiService.fetchImages().then(hits => {
    addHitsMarkup(hits);
    loadMoreBtn.enable();
  });
  }


function addHitsMarkup(hits) {
  // console.log(hits);
  refs.gallery.insertAdjacentHTML('beforeend', hitsTpl(hits));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

// const element = loadMoreBtn.refs.button;
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });