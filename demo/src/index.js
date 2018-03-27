import React from 'react';
import ReactDOM from 'react-dom';
import vimeoPosts from './vimeoPosts.json';

import VimeoSlider from '../..';

window.addEventListener('load', () => {
  const root = document.querySelector('[data-vimeo-slider]');

  if (!root) {
    return;
  }

  ReactDOM.render(<VimeoSlider vimeoPosts={vimeoPosts} />, root);
});
