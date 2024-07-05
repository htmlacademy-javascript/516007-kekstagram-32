import {findElement} from './util.js';
import {randomCard} from './data.js';


const pictureList = findElement('.pictures');
const similarPictureTemplate = findElement('#picture').content.querySelector('.picture');

const listOfCards = randomCard();

const similarListFragment = document.createDocumentFragment();

listOfCards.forEach(({url, description, comments, likes}) => {
  const pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  similarListFragment.appendChild(pictureElement);
});

const createPost = () => pictureList.appendChild(similarListFragment);

export {createPost};
