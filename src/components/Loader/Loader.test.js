import React from 'react';
import { render } from 'enzyme';
import Loader from './index';

describe('Loader', () => {
    it('should render correctly', () => {
        const tree = render(<Loader />);
        expect(tree).toMatchSnapshot();
    })
})