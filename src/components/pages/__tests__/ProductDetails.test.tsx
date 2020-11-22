import React from 'react';
import { render } from 'utils/renderProviders';
import ProductDetails from 'components/pages/ProductDetails';

describe('renders ProductDetails', () => {
  it('should match snapshot', () => {
    const { container } = render(<ProductDetails />);

    expect(container).toMatchSnapshot();
  });
});
