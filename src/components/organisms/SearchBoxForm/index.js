import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBox from "../SearchBox";
import AddButton from "../../molecules/AddButton";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    padding: ".5em",
    "& > div": {
      marginRight: "1em",
    },
  },
}));

const SearchBoxForm = ({ saveMovie }) => {
  const classes = useStyles();
  const [movie, setMovie] = useState(null);
  return (
    <div className={classes.container}>
      <SearchBox
        selectEvent={(Movie) => {
          setMovie(Movie);
        }}
      />
      <AddButton
        addEvent={() => {
          if (movie) {
            saveMovie(movie);
          }
        }}
      />
    </div>
  );
};

export default SearchBoxForm;
