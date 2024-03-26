import { render, screen } from '@testing-library/react';
import MovieList from '../pages/MovieList';
import '@testing-library/jest-dom';

describe('MovieList', () => {
  it('renders without crashing and get page text', () => {
    render(<MovieList />);
    const pageText = screen.getByText("List movies");
    expect(pageText).toBeInTheDocument();
  });
});