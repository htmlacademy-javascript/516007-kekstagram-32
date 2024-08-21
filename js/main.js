import {createPost} from './picture.js';
import {onFormSubmit, showModal, hideModal} from './form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import './form.js';
import './scale.js';
import './effect.js';

// createPost();

getData()
  .then((posts) => {
    createPost(posts);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

onFormSubmit(hideModal);
