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

const VIEW_COMMENTS_COUNT = 5;
let shownComments = 0;
let comments = [];

// создаем комментарий
const createComment = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

//вставляем комментарии
const renderComments = () => {
  shownComments += VIEW_COMMENTS_COUNT;

  if (shownComments >= comments.length) {
    commentsLoader.classList.add('hidden');
    shownComments = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < shownComments; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);
  commentShownCount.textContent = shownComments;
  commentCountTotal.textContent = comments.length;
};

// скрывает большое изображение
const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  shownComments = 0;
};

// скрывает по Escape
function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

// наполняет данными объект
const renderBigPictureDetails = ({url, likes, description}) => {
  bigPictureImage.querySelector('img').src = url;
  bigPictureImage.querySelector('img').alt = description;
  likesCount.textContent = likes;
  descriptionPhoto.textContent = description;
};

// отображает большое изображение
const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
  closeButton.addEventListener('click', hideBigPicture);
  commentsLoader.addEventListener('click', renderComments);

  renderBigPictureDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

export { showBigPicture };
