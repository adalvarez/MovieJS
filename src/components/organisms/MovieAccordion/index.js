import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import theMovieDb from "themoviedb-javascript-library";
import MovieDetail from "../../molecules/MovieDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    paddingLeft: ".5em",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  detail: {
    paddingLeft: "3em",
  },
  summary: {
    flexDirection: "row-reverse",
    padding: 0,
    "& .MuiAccordionSummary-expandIcon.Mui-expanded": {
      transform: "rotate(90deg)",
    },
  },
}));

const MovieAccordion = ({ schema, updateMovie }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({});

  const fetchMovie = async (id) => {
    return new Promise((resolve, reject) => {
      theMovieDb.movies.getById({ id }, resolve, reject);
    });
  };

  const handleChange = (panel) => async (event, isExpanded) => {
    const movie = await fetchMovie(panel);
    setCurrentMovie(movie ? JSON.parse(movie) : {});
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {schema.map((Movie) => (
        <Accordion
          key={Movie.id}
          expanded={expanded === Movie.id}
          onChange={handleChange(Movie.id)}
        >
          <AccordionSummary
            expandIcon={<ArrowForwardIosIcon />}
            aria-controls={`${Movie.id}bh-content`}
            id={`${Movie.id}bh-header`}
            className={classes.summary}
          >
            <Typography className={classes.heading}>{Movie.title}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.detail}>
            <MovieDetail
              {...Movie}
              {...currentMovie}
              watchEvent={(e) => {
                updateMovie(Movie.id, {
                  watched: e.target.checked,
                });
              }}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default MovieAccordion;
