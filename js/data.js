import {getRandomInteger, getRandomArrayElement, createId} from './util.js';

const DESCRIPTION = [
  'я как всегда',
  'ничего на свете лучше нету...',
  'как вам?',
  'я потратил множество часов, что бы сделать это фото',
  'поставите лайк?',
  'а больше ничего и не надо',
  'скорее бы домой'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const USER_NAMES = [
  'Катя',
  'Маша',
  'Петя',
  'Вася',
  'Иллона',
  'Паша',
  'Марина',
  'Слава',
  'Мира',
  'Алена',
  'Кристоф',
  'Глеб',
  'Василиса',
  'Артем',
  'Женя'
];

const MAX_LENGTH_VALUE = 25;
const MIN_LIKES_VALUE = 15;
const MAX_LIKES_VALUE = 200;
const MIN_AVATAR_VALUE = 1;
const MAX_AVATAR_VALUE = 6;


const getRandomNumberOfLikes = () => getRandomInteger(MIN_LIKES_VALUE, MAX_LIKES_VALUE);
const getRandomNumberOfAvatar = () => getRandomInteger(MIN_AVATAR_VALUE, MAX_AVATAR_VALUE);


const postId = createId();
const commentId = createId();
const photoId = createId();

//создает комемнтарий
const createComment = () => ({
  id: commentId(),
  avatar: `img/avatar-'${getRandomNumberOfAvatar()}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(USER_NAMES)
});

const newComment = Array.from({length: MAX_LENGTH_VALUE}, createComment);

//создает пост
const createPhotoElement = () => ({
  id: postId(),
  url: `photos/${photoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomNumberOfLikes(),
  comments: getRandomArrayElement(newComment),
});

const randomCard = Array.from({length: MAX_LENGTH_VALUE}, createPhotoElement);

export {randomCard};
