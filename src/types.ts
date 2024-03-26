interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

interface Pageable {
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

interface MoviePage {
  content: Movie[] | [];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface YearsWithMultipleWinners {
  years: WinnerCountByYear[]
}

interface WinnerCountByYear {
  year: number;
  winnerCount: number;
}

interface StudiosWithWinCount {
  studios: StudioWinCount[]
}

interface StudioWinCount {
  name: string;
  winCount: number;
}

interface MaxMinWinIntervalForProducers {
  max: ProducerWinInterval[];
  min: ProducerWinInterval[];
}

interface ProducerWinInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export type { Movie, Pageable, MoviePage, YearsWithMultipleWinners, StudiosWithWinCount, MaxMinWinIntervalForProducers };
