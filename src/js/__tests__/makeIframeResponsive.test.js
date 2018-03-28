import { makeIframeResponsive } from '../makeIframeResponsive';

test('It downsizes correctly', () => {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('width', '1000');
  iframe.setAttribute('height', '640');
  Object.defineProperty(iframe, 'clientWidth', { value: 400 });

  makeIframeResponsive({ iframe });
  expect(iframe.getAttribute('style')).toBe('; width: 100%; height: 256px');
});

test('It upsizes correctly', () => {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('width', '250');
  iframe.setAttribute('height', '600');
  Object.defineProperty(iframe, 'clientWidth', { value: 400 });

  makeIframeResponsive({ iframe });
  expect(iframe.getAttribute('style')).toBe('; width: 100%; height: 960px');
});

test('Running with no iframe height or width does nothing.', () => {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('width', '250');

  Object.defineProperty(iframe, 'clientWidth', { value: 400 });

  makeIframeResponsive({ iframe });
  expect(iframe.getAttribute('style')).toBe('; width: 100%');
});

test('Resize listener is called.', () => {
  let callCount = 0;
  const iframe = document.createElement('iframe');
  iframe.setAttribute('width', '250');
  iframe.setAttribute('height', '600');

  Object.defineProperty(iframe, 'clientWidth', { value: 400 });

  const cb = () => {
    callCount += 1;
  };

  const props = {
    iframe,
    cb,
  };

  makeIframeResponsive(props);

  window.dispatchEvent(new Event('resize'));

  expect(callCount).toBe(2);
});

test('Resize listener is not called if not added.', () => {
  let callCount = 0;
  const iframe = document.createElement('iframe');
  iframe.setAttribute('width', '250');
  iframe.setAttribute('height', '600');

  Object.defineProperty(iframe, 'clientWidth', { value: 400 });

  const cb = () => {
    callCount += 1;
  };

  const props = {
    iframe,
    cb,
    addResizeListener: false,
  };

  makeIframeResponsive(props);

  window.dispatchEvent(new Event('resize'));

  expect(callCount).toBe(1);
});
