import {findElement} from './util.js';

const body = findElement('body');
const bigPicture = findElement('.big-picture');
const bigPictureImage = findElement('.big-picture__img');
const closeButton = findElement('.big-picture__cancel');
const likesCount = findElement('.likes-count');
const descriptionPhoto = findElement('.social__caption');
const commentShownCount = findElement('.social__comment-shown-count');
const commentCountTotal = findElement('.social__comment-total-count');
const commentList = findElement('.social__comments');
const commentsLoader = findElement('.comments-loader');
const commentsCount = findElement('.social__comment-count');


// создаем комментарий
const createComment = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  comment.innerHTML =
    '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

//наполняем комментарии
const renderComments = (comments) => {
  commentList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.append(commentElement);
  });

  commentList.append(fragment);
};

// скрывает большое изображение
const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

// скрывает по Escape
function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

// наполняет данными объект
const renderBigPictureDetails = ({comments, url, likes, description}) => {
  bigPictureImage.querySelector('img').src = url;
  bigPictureImage.querySelector('img').alt = description;
  likesCount.textContent = likes;
  descriptionPhoto.textContent = description;
  commentShownCount.textContent = comments.length;
  commentCountTotal.textContent = comments.length;
};

// отображает большое изображение
const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentsCount.classList.add('hidden');
  document.addEventListener('keydown', onEscKeyDown);
  closeButton.addEventListener('click', hideBigPicture);

  renderBigPictureDetails(data);
  renderComments(data.comments);
};

export { showBigPicture };
