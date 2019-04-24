import React from 'react';
import styled from 'styled-components';
import Poster from '../Poster';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';
import { IMG_BASE_URL } from '../../utils/constants';
import { fetchMovies } from '../../api';

const Grid = styled.div`
  background-color: black;
  display: grid;
  padding: 40px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 0;

  @media (max-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Scroller = styled.div`
  width: 80%;
  height: 80%;
  overflow-y: scroll;
`;

class MovieContainer extends React.Component {
    constructor() {
        super();
        this.pageNum = 1;
        this.state = {
            movies: [],
            isLoading: false,
            error: false
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.getPopularMovies(this.pageNum++);
    }

    getPopularMovies = (page) => {
        fetchMovies(page)
        .then((data) => {
            const movies = data.results.map((result) => (
                {
                    posterPath: result.poster_path,
                    title: result.original_title,
                    id: result.id
                }
                ));
                this.setState((prevState) => ({
                    movies: [...prevState.movies, ...movies]
                }));
        })
        .catch(() => this.setState({ error: true }))
        .finally(() => this.setState({ isLoading: false }));
    }

    handleScroll = (e) => {
        const isBottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (isBottom) {
            this.setState({
                isLoading: true,
                error: false
            });
            this.getPopularMovies(this.pageNum++);
        }
    }

    render() {
      const { movies, isLoading, error } = this.state;
      return (
        <Scroller onScroll={this.handleScroll}>
        {
            <React.Fragment>
                <Grid>
                {
                    movies.length && movies.map(({ posterPath, title, id }) =>
                        <Poster key={id} imgSrc={`${IMG_BASE_URL}${posterPath}`} title={title} />
                    )
                }
                </Grid>
                {isLoading && <Loader />}
                {error && <ErrorMessage />}
            </React.Fragment>
        }
        </Scroller>
      );
    }
}

export default MovieContainer;