import React, { useState } from 'react';
import { Button, Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

import {
  useGetActorDetailsQuery,
  useGetMoviesByActorIdQuery,
} from '../../services/TMDB';
import { MovieList, Pagination } from '..';
import useStyles from './styles';

const Actors = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorDetailsQuery(id);
  const [page, setPage] = useState(1);
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  } else if (error) {
    return (
      <Box display="flex" justify="center" alignItems="center">
        <Button onClick={() => history.back()} color="primary">
          <ArrowBack />
          Go Back
        </Button>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || 'Sorry, no biography yet...'}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://imdb.com/name/${data?.imdb_id}/`}
            >
              IMDB
            </Button>
            <Button
              variant="text"
              startIcon={<ArrowBack />}
              onClick={() => history.back()}
              color="primary"
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        {movies ? (
          <>
            <MovieList movies={movies} numberOfMovies={12} />
            <Pagination
              currentPage={page}
              setPage={setPage}
              totalPages={movies?.total_pages}
            />
          </>
        ) : (
          'No movies found'
        )}
      </Box>
    </>
  );
};

export default Actors;
