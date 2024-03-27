/**
 * @jest-environment node
 */

import {
  fetchMovies,
  fetchYearsWithMultipleWinners,
  fetchMaxMinWinIntervalForProducers,
  fetchWinnerByYear,
} from '../services/movieService';

describe('movieService', () => {
  describe('fetchMovies', () => {
    it('should fetch movies successfully', async () => {
      const response = await fetchMovies();
      expect(Array.isArray(response.content)).toBe(true);
    });
  });

  describe('fetchYearsWithMultipleWinners', () => {
    it('should fetch years with multiple winners successfully', async () => {
      const response = await fetchYearsWithMultipleWinners();
      expect(response).toHaveProperty('years');
    });
  });

  describe('fetchMaxMinWinIntervalForProducers', () => {
    it('should fetch max and min win interval for producers successfully', async () => {
      const response = await fetchMaxMinWinIntervalForProducers();
      expect(response).toHaveProperty('max');
      expect(response).toHaveProperty('min');
    });
  });

  describe('fetchWinnerByYear', () => {
    it('should fetch winners by year successfully', async () => {
      const reponse = await fetchWinnerByYear('2018');
      const idExists = reponse.some(item => item.id === 197);
      expect(idExists).toBe(true);
    });
  });
});
