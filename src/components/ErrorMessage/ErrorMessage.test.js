import React from 'react';
import { render } from 'enzyme';
import ErrorMessage from './index';

describe('Error Message', () => {
    it('should render correctly', () => {
        const tree = render(<ErrorMessage />);
        expect(tree).toMatchSnapshot();
    })
})