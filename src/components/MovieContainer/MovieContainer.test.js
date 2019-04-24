import React from 'react';
import { render, mount } from 'enzyme';
import MovieContainer from './index';

describe('MovieContainer', () => {
    it('should render correctly', () => {
        const tree = render(<MovieContainer />);
        expect(tree).toMatchSnapshot();
    });
})