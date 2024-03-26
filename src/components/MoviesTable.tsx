import { useState, useEffect } from 'react';
import { fetchMovies } from '../services/movieService';
import { MoviePage, Movie } from '../types/movieTypes';
import './MoviesTable.css';


function MoviesTable(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [winnerFilter, setWinnerFilter] = useState<boolean | undefined>(undefined);
  const [yearFilter, setYearFilter] = useState<string | undefined>(undefined);
  const pageSize = 15;

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviePage: MoviePage = await fetchMovies(currentPage, pageSize, winnerFilter, yearFilter);
        setMovies(moviePage.content);
        setTotalPages(moviePage.totalPages);
      } catch (error) {
        console.error('Error loading movies:', error);
      }
    };

    loadMovies();
  }, [currentPage, winnerFilter, yearFilter]);

  const handleWinnerFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWinnerFilter = event.target.value === 'all' ? undefined : event.target.value === 'true';
    setCurrentPage(0);
    setWinnerFilter(selectedWinnerFilter);
  };

  const handleYearFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setYearFilter(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages - 1);
  };

  return (
    <div>
      <table className="movies-table">
        <thead>
          <tr>
            <th style={{ width: '20%' }}>ID</th>
            <th style={{ width: '20%' }}>Year
              <input type="text" id="yearFilter" value={yearFilter} onChange={handleYearFilterChange} /> 
            </th>
            <th style={{ width: '40%' }}>Title</th>
            <th style={{ width: '20%' }}>Winner?
              <select id="winnerFilter" onChange={handleWinnerFilterChange}>
                <option value="all">Yes/No</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.year}</td>
              <td>{movie.title}</td>
              <td>{movie.winner ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <button onClick={handleFirstPage} disabled={currentPage === 0}>{'|<'}</button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
          {'<'}
        </button>
        {Array.from(Array(totalPages).keys()).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={pageNum === currentPage ? 'active' : ''}
          >
            {pageNum + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
          {'>'}
        </button>
        <button onClick={handleLastPage} disabled={currentPage === totalPages - 1}>{'>|'}</button>
      </div>
    </div>
  );
}

export default MoviesTable;