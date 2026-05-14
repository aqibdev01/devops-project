import { render, screen } from '@testing-library/react';
import App from './App';

test('renders todo app heading', () => {
  render(<App />);
  const heading = screen.getByText(/todo app/i);
  expect(heading).toBeInTheDocument();
});

test('renders add button', () => {
  render(<App />);
  const button = screen.getByText(/add/i);
  expect(button).toBeInTheDocument();
});
