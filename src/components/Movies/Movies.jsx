import React, { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typeography,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList } from '../index';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" lineItems="center" mt="20px">
        <typography variant="h4">
          No movies matching that search
          <br>Please search for something else</br>
        </typography>
      </Box>
    );
  }

  if (error) return 'An error has returned!';

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
