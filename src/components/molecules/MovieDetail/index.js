import React from "react";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  movieField: {
    lineHeight: 1.5,
    fontSize: "0.875rem",
  },
  checkbox: {
    position: "absolute",
    right: "1em",
    [theme.breakpoints.down("sm")]: {
      position: "inherit",
    },
  },
}));

const MovieItem = ({
  poster_path = null,
  release_date,
  runtime,
  vote_average,
  watched,
  watchEvent,
}) => {
  const classes = useStyles();

  const getImage = () => {
    if (!poster_path) {
      return `https://via.placeholder.com/45x68/f0f0f0/333333?text=Movie`;
    } else {
      return `https://image.tmdb.org/t/p/w92${poster_path}`;
    }
  };

  const getYear = () => {
    if (release_date) {
      return moment(release_date).year();
    } else {
      return `NA`;
    }
  };

  const year = getYear();
  const imageSrc = getImage();

  return (
    <div>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item>
          <img src={imageSrc} />
        </Grid>
        <Grid item xs style={{ paddingTop: "1.5em" }}>
          <Grid container direction="column">
            <Grid item xs>
              <Typography variant="subtitle1" className={classes.movieField}>
                Year: {year}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" className={classes.movieField}>
                Runtime: {runtime ? `${runtime}m` : ``}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" className={classes.movieField}>
                IMDB Score: {vote_average}
              </Typography>
            </Grid>
            <FormControlLabel
              className={classes.checkbox}
              control={
                <Checkbox
                  color="primary"
                  checked={watched}
                  onChange={watchEvent}
                />
              }
              label="Watched"
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MovieItem;
