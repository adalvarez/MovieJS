import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import AppBarHandler from "../molecules/AppBarHandler";
import MovieAccordion from "../organisms/MovieAccordion";
import SearchBoxFrom from "../organisms/SearchBoxForm";
import MovieFilterBox from "../organisms/MovieFilterBox";

const ENV_LS_CONTEXT = `data`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: "2% 5% 2% 5%",
  },
}));

const extractLocalStorage = () => {
  const prevData = localStorage.getItem(ENV_LS_CONTEXT);
  try {
    if (!prevData) return [];
    return JSON.parse(prevData);
  } catch (err) {
    localStorage.removeItem(ENV_LS_CONTEXT);
    return [];
  }
};

const Home = () => {
  const classes = useStyles();
  const prevData = extractLocalStorage();
  const [moviesRepository, setMoviesRepository] = useState(prevData);

  const accordionUpdate = (id, update) => {
    setMoviesRepository((prevState) => {
      const newState = prevState.map((Movie) =>
        Movie.id === id ? { ...Movie, ...update } : Movie
      );
      localStorage.setItem(ENV_LS_CONTEXT, JSON.stringify(newState));
      return newState;
    });
  };

  const saveMovie = (Movie) => {
    const { id, title } = Movie;
    if (!moviesRepository.find((Movie) => Movie.id === id)) {
      setMoviesRepository((prevState) => {
        const newRepository = prevState.slice().concat({
          id,
          title,
          watched: false,
        });
        localStorage.setItem(ENV_LS_CONTEXT, JSON.stringify(newRepository));
        return newRepository;
      });
    }
  };

  const filterMoviesByInput = (input) => {
    if (!input) {
      // Input empty will load LS data back.
      setMoviesRepository(extractLocalStorage());
    } else {
      setMoviesRepository((prevState) => {
        const newRepository = prevState.filter(
          (Movie) =>
            Movie.title.toLowerCase().indexOf(input.toLowerCase()) !== -1
        );
        return newRepository;
      });
    }
  };

  const schema = [
    {
      label: "Unwatched",
      icon: <VisibilityOffIcon />,
      index: 0,
      panel: function () {
        return (
          <MovieAccordion
            schema={moviesRepository.filter((Movie) => !Movie.watched)}
            updateMovie={accordionUpdate}
          />
        );
      },
    },
    {
      label: "Watched",
      icon: <VisibilityIcon />,
      index: 1,
      panel: function () {
        return (
          <MovieAccordion
            schema={moviesRepository.filter((Movie) => Movie.watched)}
            updateMovie={accordionUpdate}
          />
        );
      },
    },
  ];

  return (
    <div className={classes.root}>
      <SearchBoxFrom saveMovie={saveMovie} />
      <MovieFilterBox filterByText={filterMoviesByInput} />
      <AppBarHandler schema={schema} />
    </div>
  );
};

export default Home;
