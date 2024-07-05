const findElement = (element) => document.querySelector(element);
const findAllElements = (elements) => document.querySelectorAll(elements);

// возвращает рандомное число из диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// возвращает рандомный элемент из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// создает порядковые номера
const createId = () => {
  let id = 1;
  return () => id++;
};

export {getRandomInteger, getRandomArrayElement, createId, findElement, findAllElements};
