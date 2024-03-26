import { useEffect, useState } from "react";

import { fetchMovies } from "../services/movieService";
import { Movie, MoviePage } from "../types/movieTypes";
import Table from "../components/Table/Table";

const columns = [
  { name: "id", label: "ID" },
  { name: "year", label: "Year", filterKey: "year", filterType: "year"},
  { name: "title", label: "Title" },
  { name: "winner", label: "Winner?", filterKey: "winner", filterType: "boolean", type: "boolean"},
];

function MovieList(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<{ [key: string]: string | boolean | null }>({
    year: null,
    winner: null,
  });
  const pageSize = 15;

  const onFilterChange = (filterKey: string, value: string | boolean | null) => {
    setCurrentPage(0);
    console.log(filters);
    setFilters({ ...filters, [filterKey]: value });
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviePage: MoviePage = await fetchMovies(
          currentPage,
          pageSize,
          filters.winner as boolean,
          filters.year as string
        );
        setMovies(moviePage.content);
        setTotalPages(moviePage.totalPages);
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };

    loadMovies();
  }, [currentPage, filters]);

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h2>List movies</h2>
      <Table
        data={movies}
        columns={columns}
        onPageChange={onPageChange}
        page={currentPage}
        totalPages={totalPages}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}

export default MovieList;
