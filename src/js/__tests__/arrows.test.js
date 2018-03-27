import React from 'react';
import renderer from 'react-test-renderer';

import { NextArrow, PrevArrow } from '../arrows';

test('NextArrow renders correct', () => {
  const tree = renderer.create(<NextArrow />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('PrevArrow renders correct', () => {
  const tree = renderer.create(<PrevArrow />).toJSON();
  expect(tree).toMatchSnapshot();
});
