import React from 'react';
import { render } from 'enzyme';
import Poster from './index';

describe('Poster', () => {
    it('should render correctly', () => {
        const tree = render(<Poster />);
        expect(tree).toMatchSnapshot();
    });

    it('should render correctly with img src and title', () => {
        const tree = render(<Poster imgSrc={'test.png'} title={'title'} />);
        expect(tree).toMatchSnapshot();
    });
})