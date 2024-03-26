import {
  MoviePage,
  YearsWithMultipleWinners,
  StudiosWithWinCount,
  MaxMinWinIntervalForProducers,
  Movie,
} from "../types";

const API_URL = "https://tools.texoit.com/backend-java/api/movies";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchData = async (endpoint: string): Promise<any> => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}`, error);
    throw error;
  }
};

const fetchMovies = async (
  page = 0,
  size = 15,
  winner?: boolean | null,
  year?: string | null
): Promise<MoviePage> => {
  const url = new URL(API_URL);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("size", size.toString());
  url.searchParams.append("winner", (winner ?? "").toString());
  url.searchParams.append("year", year ?? "");

  return fetchData(url.toString());
};

const fetchYearsWithMultipleWinners =
  async (): Promise<YearsWithMultipleWinners> => {
    const url = new URL(`${API_URL}?projection=years-with-multiple-winners`);
    return fetchData(url.toString());
  };

const fetchStudiosWithWinCount = async (): Promise<StudiosWithWinCount> => {
  const url = new URL(`${API_URL}?projection=studios-with-win-count`);
  return fetchData(url.toString());
};

const fetchMaxMinWinIntervalForProducers =
  async (): Promise<MaxMinWinIntervalForProducers> => {
    const url = new URL(
      `${API_URL}?projection=max-min-win-interval-for-producers`
    );
    return fetchData(url.toString());
  };

const fetchWinnerByYear = async (year: string): Promise<Movie[]> => {
  const url = new URL(`${API_URL}?winner=true`);
  url.searchParams.append("year", year ?? "");

  return fetchData(url.toString());
};

export {
  fetchMovies,
  fetchYearsWithMultipleWinners,
  fetchStudiosWithWinCount,
  fetchMaxMinWinIntervalForProducers,
  fetchWinnerByYear,
};
