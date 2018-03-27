import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';

import VimeoSlider from '..';
import vimeoPosts from '.../../../demo/src/vimeoPosts.json';

Enzyme.configure({ adapter: new Adapter() });

test('Several iframes are rendered within two seconds.', (done) => {
  const el = mount(<VimeoSlider vimeoPosts={vimeoPosts} />);

  setTimeout(() => {
    expect(el.html().split('iframe').length).toBeGreaterThan(1);

    done();
  }, 2000);
});
