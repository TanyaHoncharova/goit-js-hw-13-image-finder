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


refs.searchForm.addEventListener('submit', onSubmit)
loadMoreBtn.refs.button.addEventListener('click', debounce(fetchImage, 1000));


function onSubmit(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;
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
    // element.scrollIntoView();
  });
  }


function addHitsMarkup(hits) {
  // console.log(hits);
  refs.gallery.insertAdjacentHTML('beforeend', hitsTpl(hits));

  loadMoreBtn.refs.button.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });

}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

// const element = document.getElementById('scrollTo');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });