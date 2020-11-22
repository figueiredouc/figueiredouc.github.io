import React from 'react';
import { render } from 'utils/renderProviders';
import OrderSuccessPage from 'components/pages/OrderSuccessPage';

describe('renders OrderSuccessPage', () => {
  it('should match snapshot', () => {
    const { container } = render(<OrderSuccessPage />);

    expect(container).toMatchSnapshot();
  });
});
