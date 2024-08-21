import {findElement, showAlert} from './util.js';
import {resetEffects} from './effect.js';
import {sendData} from './api.js';

const uploadFile = findElement('.img-upload__input');
const overlay = findElement('.img-upload__overlay');
const body = findElement('body');
const form = findElement('.img-upload__form');
const cancelButton = findElement('.img-upload__cancel');
const hashtagField = findElement('.text__hashtags');
const commentField = findElement('.text__description');
const submitButton = findElement('.img-upload__submit');

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

const hideModal = () => {
  form.reset();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

const isTextFieldFocused = document.activeElement ? hashtagField : commentField;

function onEscKeyDown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused) {
    evt.preventDefault();
    hideModal();
  }
}

const hasValidSymbols = (string) => VALID_SYMBOLS.test(string);

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ');

  return hasUniqueTags(tags) && hasValidSymbols(tags) && hasValidCount(tags);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены хэштеги',
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch((err) => {
          showAlert(err.message);
        })
        .finally(unblockSubmitButton);
    }
  });
};

uploadFile.addEventListener('change', showModal);
cancelButton.addEventListener('click', hideModal);

export {onFormSubmit, showModal, hideModal};
