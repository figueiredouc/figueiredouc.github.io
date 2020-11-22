import React from 'react';
import { render } from 'utils/renderProviders';
import Products from 'components/pages/Products';

describe('renders Products', () => {
  it('should match snapshot', () => {
    const { container } = render(<Products />);

    expect(container).toMatchSnapshot();
  });
});
