import { makeIframeResponsive } from '../makeIframeResponsive';

test('It downsizes correctly', () => {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('width', '1000');
  iframe.setAttribute('height', '640');
  Object.defineProperty(iframe, 'clientWidth', { value: 400 });

  makeIframeResponsive(iframe);
  expect(iframe.getAttribute('style')).toBe('; width: 100%; height: 256px');
});

test('It upsizes correctly', () => {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('width', '250');
  iframe.setAttribute('height', '600');
  Object.defineProperty(iframe, 'clientWidth', { value: 400 });

  makeIframeResponsive(iframe);
  expect(iframe.getAttribute('style')).toBe('; width: 100%; height: 960px');
});

test('Running with no iframe height or width does nothing.', () => {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('width', '250');

  Object.defineProperty(iframe, 'clientWidth', { value: 400 });

  makeIframeResponsive(iframe);
  expect(iframe.getAttribute('style')).toBe('; width: 100%');
});
