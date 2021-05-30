const KEY = '21857755-e4f1c8434e57799dc3fa1e51f';
const BASE_URL = 'https://pixabay.com/api/';

// запрос должен выглядеть так 
// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ

// По умолчанию параметр page равен 1. При каждом последующем запросе page увеличивается на 1,
//     а при поиске по новому ключевому слову необходимо сбрасывать его значение в 1.