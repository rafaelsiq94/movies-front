import MoviesTable from '../components/MoviesTable';

function MovieList(): JSX.Element {
  return (
    <div>
      <h2>List movies</h2>
      <MoviesTable/>
    </div>
  );
}

export default MovieList;