import React from 'react';
import { render } from '@testing-library/react';
import App from 'app/App';

describe('renders App', () => {
  it('should match snapshot', () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });
});
