import React from 'react';
import { render } from 'utils/renderProviders';
import EditUserAccount from 'components/pages/EditUserAccount';

describe('renders EditUserAccount', () => {
  it('should match snapshot', () => {
    const { container } = render(<EditUserAccount />);

    expect(container).toMatchSnapshot();
  });
});
