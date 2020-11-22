import React from 'react';
import { render } from 'utils/renderProviders';
import LandingPage from 'components/pages/LandingPage';

describe('renders LandingPage', () => {
  it('should match snapshot', () => {
    const { container } = render(<LandingPage />);

    expect(container).toMatchSnapshot();
  });
});
