import React from 'react';
import { render } from 'utils/renderProviders';
import UserAccountPage from 'components/pages/UserAccountPage';

describe('renders UserAccountPage', () => {
  it('should match snapshot', () => {
    const { container } = render(<UserAccountPage />);

    expect(container).toMatchSnapshot();
  });
});
