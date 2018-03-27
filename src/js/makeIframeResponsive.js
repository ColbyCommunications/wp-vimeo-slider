/**
 * Sets an iframe's height based on its actual width, using the element's height and
 * width attributes to calculate the dimension.
 *
 * @param {HTMLElement} iframe An iframe.
 * @param {bool} addResizeListener Whether to add this function as a resize callback.
 */
export const makeIframeResponsive = (iframe, addResizeListener = true) => {
  const existingStyle = iframe.getAttribute('style') || '';

  iframe.setAttribute('style', `${existingStyle}; width: 100%`);
  const iframeHeight = iframe.getAttribute('height');
  const iframeWidth = iframe.getAttribute('width');

  if (!(iframeHeight && iframeWidth)) {
    return;
  }

  const ratio = iframe.clientWidth / iframeWidth;
  iframe.setAttribute('style', `${existingStyle}; width: 100%; height: ${iframeHeight * ratio}px`);

  if (addResizeListener === true) {
    window.addEventListener('resize', () => makeIframeResponsive(iframe, false));
  }
};
