import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders main app', () => {
  const { getByText } = render(<App />);
  const productText = getByText(/products/i);
  expect(productText).toBeInTheDocument();
});
