import React, { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  selectGenreOrCategory,
  searchMovie,
} from '../features/currentGenreOrCategory';
import { fetchToken } from '../utils';
import { ColorModeContext } from '../utils/ToggleColorMode';

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    alanBtn({
      key: '1f2c7fcdd1110b219baa2066d86b9ba42e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        // Taking alan props checking for the command
        if (command === 'chooseGenre') {
          // checking the genre searched is in the database
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );
          console.log(foundGenre);
          if (foundGenre) {
            // if the genre is found, push to home and search genre
            history.push('/');
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            // if the found genre is not in the list (top rated, upcoming, popular categories)
            const category = genreOrCategory.startsWith('top')
              ? 'top_rated'
              : genreOrCategory;

            history.push('/');
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === 'changeMode') {
          // checking for dar/light and settinng
          if (mode === 'light') {
            setMode('light');
          } else {
            setMode('dark');
          }
        } else if (command === 'login') {
          // fetching token if command is login
          fetchToken();
        } else if (command === 'logout') {
          // clears hisotyr and forwards to home if logout
          localStorage.clear();
          history.push('/');
        } else if (command === 'search') {
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);
};

export default useAlan;
