import React, { useEffect, useState, useMemo } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import throttle from "lodash/throttle";
import classNames from "classnames";
import InputAdornment from "@material-ui/core/InputAdornment";
import Popper from "@material-ui/core/Popper";
import SearchIcon from "@material-ui/icons/Search";
import theMovieDb from "themoviedb-javascript-library";
import MovieItem from "../../molecules/MovieItem";

const useStyles = makeStyles((theme) => ({
  searchBox: {
    width: "18em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  searchBoxPopper: {
    width: "350",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const SearchBox = ({ selectEvent }) => {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        theMovieDb.search.getMovie(request, callback, (err) => {
          console.error(err);
        });
      }, 200),
    []
  );

  useEffect(() => {
    let active = true;
    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }
    fetch({ query: inputValue }, (results) => {
      results = JSON.parse(results);
      if (active) {
        let newOptions = [];
        if (value) {
          newOptions.push(value);
        }
        if (results) {
          newOptions = [...newOptions, ...results.results];
        }
        setOptions(newOptions);
      }
    });
    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id="mjs-search-box-autocomplete"
      className={classes.searchBox}
      size="small"
      PopperComponent={(props) => (
        <Popper
          {...props}
          className={classNames(props.className, classes.searchBoxPopper)}
          placement="bottom-start"
        />
      )}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.title
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        selectEvent(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search MovieDB"
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: null,
          }}
        />
      )}
      renderOption={(option) => <MovieItem {...option} />}
    />
  );
};

export default SearchBox;
