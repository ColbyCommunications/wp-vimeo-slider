import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';

import vimeoPosts from '.../../../demo/src/vimeoPosts.json';
import Video from '../Video';

const post = vimeoPosts[0];

Enzyme.configure({ adapter: new Adapter() });

test('The iframe is rendered within two seconds.', (done) => {
  const el = mount(<Video post={post} />);

  setTimeout(() => {
    expect(el.html().indexOf('iframe')).not.toBe(-1);

    done();
  }, 2000);
});

test('No paragraph renders when there is no description.', () => {
  const el = mount(<Video post={post} />);

  expect(el.html().indexOf('<p')).toBe(-1);
});

test('A paragraph renders when there is a description.', () => {
  post.colbycomms__vimeo_slider__vimeo_description = 'A description';

  const el = mount(<Video post={post} />);

  expect(el.html().indexOf('<p')).not.toBe(-1);
});
