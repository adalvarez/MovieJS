import React from "react";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    lineHeight: 1,
  },
  year: {
    fontSize: "0.875rem",
  },
}));

const MovieItem = ({ poster_path = null, title, release_date }) => {
  const classes = useStyles();

  const getImage = () => {
    if (!poster_path) {
      return `https://via.placeholder.com/45x68/f0f0f0/333333?text=Movie`;
    } else {
      return `https://image.tmdb.org/t/p/w45${poster_path}`;
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
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <img src={imageSrc} />
      </Grid>
      <Grid item xs>
        <Grid container direction="column">
          <Grid item xs>
            <Typography variant="subtitle1" className={classes.title}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" className={classes.year}>
              Year: {year}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieItem;
