import { useState, useEffect } from 'react';
import { fetchMovies } from '../services/movieService';
import MoviesTable from '../components/MoviesTable';
import { Movie } from '../types/movieTypes';

function MovieList(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const moviePage = await fetchMovies();
        setMovies(moviePage.content);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMoviesData();
  }, []);

  return (
    <div>
      <h2>Movie List</h2>
      <MoviesTable movies={movies} />
    </div>
  );
}

export default MovieList;