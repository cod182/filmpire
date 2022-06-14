import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { getMoviesByActorId } from '../../services/TMDB';

import { Movie } from '..';
import { useGetActorDetailsQuery } from '../../services/TMDB';
import useStyles from './alt-styles';

const Actors = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorDetailsQuery(id);
  const classes = useStyles();
  const {
    data: moviesContainingrActor,
    isFetchingCredits,
    errorCredit,
  } = getMoviesByActorId(id);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  } else if (error) {
    return (
      <Box display="flex" justify="center" alignItems="center">
        <Link to="/">Something has gone wrong, go back</Link>
      </Box>
    );
  }
  return (
    <Grid container className={classes.containerLeft}>
      <Grid item sm={12} lg={4}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
          alt={data?.name}
        />
      </Grid>
      <Grid
        item
        container
        direction="column"
        lg={7}
        className={classes.containerRight}
      >
        <Typography variant="h2" align="left" gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant="h5" align="left" gutterBottom>
          Born: {data?.birthday}
        </Typography>
        <Grid item>
          <Box display="flex" align="left">
            <Typography>{data?.biography.split('\n')[0]}</Typography>
          </Box>
        </Grid>
        <Grid>
          <ButtonGroup
            size="md"
            style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Button
              variant="contained"
              target="_black"
              url="noopener noreferrer"
              href={`https://imdb.com/name/${data?.imdb_id}/`}
            >
              IMDB
            </Button>
            <Button variant="text" onClick={() => history.back()}>
              <ArrowBack />
              Back
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          Movies
        </Typography>
        {/* // Loop through recommended movies */}
        {moviesContainingrActor ? (
          <Grid container className={classes.moviesContainer}>
            {moviesContainingrActor.cast.slice(0, 12).map((movie, i) => (
              <Movie key={i} movie={movie} i={i} />
            ))}
          </Grid>
        ) : (
          <Box>Sorry, nothing found</Box>
        )}
      </Box>
    </Grid>
  );
};

export default Actors;
