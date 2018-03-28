/* eslint no-unused-expressions: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import Slider from 'react-slick';

import Video from './Video';
import { PrevArrow, NextArrow } from './arrows';

injectGlobal`
  * {
    min-width: 0;
    min-height: 0;
  }

  [data-vimeo-slider] {
    margin: 0 auto;
  }
`;

const SLIDER_SETTINGS = {
  dots: false,
  speed: 500,
  infinite: false,
  initialSlide: 2,
  autoplay: false,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  accessibility: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const StyledSlider = styled(Slider)`
  position: relative;
  box-sizing: border-box;
  display: block;
  width: 100%;
  -webkit-touch-callout: none;
  touch-action: pan-y;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transform: translateZ(0);

  .slick-list {
    position: relative;
    display: block;
    padding: 0;
    margin: 0;
    overflow: visible;
    transform: translate3d(0, 0, 0);

    &.dragging {
      cursor: pointer;
      cursor: hand;
    }
  }

  .slick-track {
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    margin-right: auto;
    margin-left: auto;
    transform: translate3d(0, 0, 0);

    &::before,
    &::after {
      display: table;
      content: '';
    }

    &::after {
      clear: both;
    }

    .slick-loading & {
      visibility: hidden;
    }
  }

  .slick:focus {
    outline: none;
  }

  .slick-slide {
    float: left;
    height: 100%;
    min-height: 1px;

    .slick-initialized & {
      display: block;
    }

    .slick-loading & {
      visibility: hidden;
    }

    .slick-vertical & {
      display: block;
      height: auto;
      border: 1px solid transparent;
    }
  }

  .slick-arrow.slick-hidden {
    display: none;
  }
`;

const StyledVideoContainer = styled.div`
  padding: 0.75rem;
`;

class VimeoSlider extends React.Component {
  static propTypes = {
    totalPosts: PropTypes.number,
    vimeoPosts: PropTypes.arrayOf(PropTypes.object),
    vimeoPostsEndpoint: PropTypes.string,
    sliderSettings: PropTypes.objectOf(PropTypes.any),
    includedPosts: PropTypes.string,
  };

  static defaultProps = {
    totalPosts: 5,
    vimeoPosts: [],
    vimeoPostsEndpoint: '',
    sliderSettings: {},
    includedPosts: null,
  };

  static getStartingIndex(posts) {
    const half = Math.ceil(posts.length / 2);

    return half - 1;
  }

  constructor(props) {
    super(props);

    this.state = {
      posts: props.vimeoPosts.length > 0 ? props.vimeoPosts : [],
    };
  }

  async componentDidMount() {
    if (this.state.posts.length > 0) {
      return;
    }

    if (this.props.vimeoPostsEndpoint === null) {
      return;
    }

    this.fetchPosts();
  }

  async fetchPosts({ totalPosts, vimeoPostsEndpoint, includedPosts } = this.props) {
    const includeParams = includedPosts ? `&include=${includedPosts}&orderby=include` : '';
    const response = await fetch(`${vimeoPostsEndpoint}?per_page=${totalPosts}${includeParams}`);
    const posts = await response.json();

    this.setState({ posts });
  }

  render = ({ sliderSettings } = this.props, { posts } = this.state) =>
    posts.length > 0 && (
      <StyledSlider
        {...Object.assign(
          {},
          SLIDER_SETTINGS,
          { initialSlide: VimeoSlider.getStartingIndex(posts) },
          sliderSettings,
        )}
      >
        {posts.map(post => (
          <StyledVideoContainer key={post.id}>
            <Video post={post} />
          </StyledVideoContainer>
        ))}
      </StyledSlider>
    );
}

export default VimeoSlider;
