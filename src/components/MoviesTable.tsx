import { Movie } from '../types/movieTypes';

interface Props {
  movies: Movie[];
}

function MoviesTable({ movies }: Readonly<Props>): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Year</th>
          <th>Studios</th>
          <th>Producers</th>
          <th>Winner</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie.id}>
            <td>{movie.id}</td>
            <td>{movie.title}</td>
            <td>{movie.year}</td>
            <td>{movie.studios.join(', ')}</td>
            <td>{movie.producers.join(', ')}</td>
            <td>{movie.winner ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MoviesTable;