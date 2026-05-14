import { render, screen } from '@testing-library/react';
import App from './App';

test('renders todo app heading', () => {
  render(<App />);
  const heading = screen.getByText(/todo app/i);
  expect(heading).toBeInTheDocument();
});

test('renders add button', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /add/i });
  expect(button).toBeInTheDocument();
});

test('renders input placeholder', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/add a new todo/i);
  expect(input).toBeInTheDocument();
});
