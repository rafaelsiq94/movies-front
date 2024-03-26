import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard/Dashboard';
import '@testing-library/jest-dom';

describe('MovieList', () => {
  it('renders without crashing and get page text', () => {
    render(<Dashboard />);
    const pageText = screen.getByText("Top 3 studios with winner");
    expect(pageText).toBeInTheDocument();
  });
});