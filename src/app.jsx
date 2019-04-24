import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

import MovieContainer from './components/MovieContainer';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  height: 100vh;
`;

const renderApplication = () => {
  ReactDOM.render(
    <Wrapper>
      <MovieContainer />
    </Wrapper>,
    document.querySelector('#root')
  );
}

renderApplication(MovieContainer);

if (module.hot) {
  module.hot.accept("./components/MovieContainer", () => {
    renderApplication();
  });
}
