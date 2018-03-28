/* eslint react/no-danger: 0, max-len: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Player from '@vimeo/player';

import { makeIframeResponsive } from './makeIframeResponsive';

const StyledVideo = styled.div`
  display: block;
  padding: 0;
  color: black;
  pointer-events: none;
  opacity: 0.6;
  transition: transform 0.1s ease-out, opacity 0.2s;
  transform: scale(0.9);

  .slick-active & {
    pointer-events: auto;
    opacity: 1;
    transform: scale(1);
  }

  @media screen and (min-width: 768px) {
    padding: 0 0.75rem;
  }

  h4 {
    width: 100%;
    padding: 0 1.25rem;
    margin-top: 0;
    margin-bottom: 0;
    line-height: 1.414;
    color: #214280;
    color: var(--primary, #214280);
    text-align: center;
  }
`;

const StyledVideoInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;

  img {
    width: 100%;
    height: auto;
    margin: 0 auto;
  }

  video {
    width: 100%;
    height: auto;
  }
`;

const StyledDescription = styled.div`
  padding: 0 1.5rem;
  text-align: center;

  p {
    margin-top: 0;
    font-weight: 400;
    color: #858585;
  }
`;

export default class Video extends React.Component {
  static propTypes = {
    post: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  componentDidMount() {
    this.startPlayer();
  }

  startPlayer({ colbycomms__vimeo_slider__vimeo_id: id } = this.props.post) {
    if (!this.videoContainer) {
      return;
    }

    this.player = new Player(this.videoContainer, {
      id,
    });

    this.player.on('loaded', () => {
      makeIframeResponsive({
        iframe: this.player.iframe,
      });
    });
  }

  render = ({ title, colbycomms__vimeo_slider__vimeo_description: description } = this.props.post) => (
    <StyledVideo>
      <StyledVideoInner>
        <div
          ref={(container) => {
            this.videoContainer = container;
          }}
        />
        <h4 dangerouslySetInnerHTML={{ __html: title.rendered }} />
        {description && (
          <StyledDescription>
            <p
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </StyledDescription>
        )}
      </StyledVideoInner>
    </StyledVideo>
  );
}
