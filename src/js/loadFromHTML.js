import React from 'react';
import { render } from 'react-dom';
import VimeoSlider from '.';

export const loadFromHTML = () => {
  const root = document.querySelector('[data-vimeo-slider]');

  if (!root) {
    return;
  }

  const vimeoPostsEndpoint = root.getAttribute('data-vimeo-posts-endpoint');
  if (vimeoPostsEndpoint) {
    render(
      <VimeoSlider
        vimeoPostsEndpoint={vimeoPostsEndpoint}
        includedPosts={root.getAttribute('data-vimeo-posts')}
      />,
      root,
    );
  }
};

window.addEventListener('load', loadFromHTML);
