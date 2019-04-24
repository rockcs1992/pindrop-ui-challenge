import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    transform: translateY(20%);
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Image = styled.img.attrs({
  src: ({ imgSrc }) => imgSrc
})`
  height: 100%;
  width: 100%;
  display: block;
`;

const Title = styled.p`
  background-color: lightgrey;
  margin: 0;
  width: 100%;
  text-align: center;
`;

const PosterWrapper = styled.div`
  position: relative;
  display: inline-block;
  animation: ${fadeIn} 0.5s;

  &:hover {
    transform: scale(1.2);
    transition: 0.5s;
    z-index: 99;
  }

  &:hover:after {
    background-color: transparent;
    transition: 0.3s;
  }
  
  &:not(:hover) {
    transition: 0.5s;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    left: 0;
    top: 0;
  }
`;

const Poster = ({ imgSrc, title }) => {
  const [imageLoaded, showPoster] = useState(false);
  return (
    <PosterWrapper>
      <Image imgSrc={imgSrc} onLoad={() => {showPoster(true)}}/>
      {imageLoaded && <Title>{title}</Title>}
    </PosterWrapper>
  );
}

Poster.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string
};

export default Poster;
