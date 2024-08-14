import {findElement} from './util.js';

const smallerControl = findElement('.scale__control--smaller');
const biggerControl = findElement('.scale__control--bigger');
const valueControl = findElement('.scale__control--value');
const image = findElement('.img-upload__preview img');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const scaleImage = (value) => {
  image.style.transform = `scale(${value / 100})`;
};

const onPlusButtonClick = () => {
  const currentValue = parseInt(valueControl.value, 10);
  const newValue = currentValue + SCALE_STEP;

  if (newValue <= MAX_SCALE) {
    valueControl.value = `${newValue } %`;
    scaleImage(newValue);
  }
};

const onMinusButtonClick = () => {
  const currentValue = parseInt(valueControl.value, 10);
  const newValue = currentValue - SCALE_STEP;

  if (newValue <= MAX_SCALE && newValue >= MIN_SCALE) {
    valueControl.value = `${newValue } %`;
    scaleImage(newValue);
  }
};

smallerControl.addEventListener('click', onMinusButtonClick);
biggerControl.addEventListener('click', onPlusButtonClick);
