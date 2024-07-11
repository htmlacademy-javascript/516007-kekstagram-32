import {findElement} from './util.js';
import {randomCard} from './data.js';
import {showBigPicture} from './big-picture.js';


const pictureList = findElement('.pictures');
const similarPictureTemplate = findElement('#picture').content.querySelector('.picture');

const listOfCards = randomCard();

const similarListFragment = document.createDocumentFragment();


// при отрисовки миниатюр, навешиваем обработчик для открытия большого изображения
listOfCards.forEach((data) => {
  const {comments, description, likes, url} = data;
  const pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  similarListFragment.appendChild(pictureElement);

  pictureElement.addEventListener('click', () => {
    showBigPicture(data);
  });
});

const createPost = () => pictureList.appendChild(similarListFragment);

export {createPost};
