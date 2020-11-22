import React from 'react';
import { render } from 'utils/renderProviders';
import OrderPage from 'components/pages/OrderPage';

describe('renders OrderPage', () => {
  it('should match snapshot', () => {
    const { container } = render(<OrderPage />);

    expect(container).toMatchSnapshot();
  });
});
