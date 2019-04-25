import React from 'react';
import { render, mount } from 'enzyme';
import * as api from '../../api';
import MovieContainer from './index';

jest.mock('../../api');
api.fetchMovies.mockImplementation(() => Promise.resolve(true))

describe('onScroll', () => {
    it('should fire events when scrolled to the bottom', () => {
        const event = {
            target: {
                scrollHeight: 2,
                scrollTop: 1,
                clientHeight: 1
            }
        }
        const instance = mount(<MovieContainer />).instance();
        instance.pageNum = 1;
        instance.totalPages = 2;
        instance.handleScroll(event);
        expect(instance.state.isLoading).toBe(true);
        expect(instance.state.error).toBe(false);
        expect(api.fetchMovies).toHaveBeenCalledTimes(2);
    })

    it('should not fire events if not scrolled to the bottom', () => {
        const event = {
            target: {
                scrollHeight: 5,
                scrollTop: 1,
                clientHeight: 1
            }
        }
        const instance = mount(<MovieContainer />).instance();
        instance.pageNum = 1;
        instance.totalPages = 2;
        instance.handleScroll(event);
        expect(api.fetchMovies).not.toHaveBeenCalledTimes(2);
    })

    it('should not fire events if already on the last page', () => {
        const event = {
            target: {
                scrollHeight: 5,
                scrollTop: 1,
                clientHeight: 1
            }
        }
        const instance = mount(<MovieContainer />).instance();
        instance.pageNum = 3;
        instance.totalPages = 2;
        instance.handleScroll(event);
        expect(api.fetchMovies).not.toHaveBeenCalledTimes(2);
    })
})

describe('MovieContainer', () => {
    it('should render correctly', () => {
        const tree = render(<MovieContainer />);
        expect(tree).toMatchSnapshot();
    });

    it('should render correctly when loading', () => {
        const tree = mount(<MovieContainer />);
        tree.setState({ isLoading: true });
        expect(tree).toMatchSnapshot();
    });

    it('should render correctly when error', () => {
        const tree = mount(<MovieContainer />);
        tree.setState({ error: true });
        expect(tree).toMatchSnapshot();
    });
});

describe('On component mount', () => {
    it('should mount correctly', () => {
        const tree = mount(<MovieContainer />);
        expect(tree.instance().state.isLoading).toBe(true);
        expect(api.fetchMovies).toHaveBeenCalledWith(1);
    });
})

describe('handleMovieData', () => {
    const data = {
        results: [{
            poster_path: '/awd.jpg',
            original_title: 'test',
            id: '1200'
        }]
    };
    const expectedData = [{
        posterPath: '/awd.jpg',
        title: 'test',
        id: '1200'
    }]
    it('should handle movie data', () => {
        const instance = mount(<MovieContainer />).instance();
        instance.handleMovieData(data);
        expect(instance.state.isLoading).toBe(false);
        expect(instance.state.movies).toEqual(expectedData);
    })
})
