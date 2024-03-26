import { MoviePage } from "../types/movieTypes";

const API_URL = "https://tools.texoit.com/backend-java/api/movies";

const fetchMovies = async (
  page = 0,
  size = 15,
  winner?: boolean,
  year?: string
): Promise<MoviePage> => {
  const url = new URL(API_URL);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("size", size.toString());
  url.searchParams.append("winner", (winner ?? "").toString());
  url.searchParams.append("year", (year ?? ""));

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export { fetchMovies };
