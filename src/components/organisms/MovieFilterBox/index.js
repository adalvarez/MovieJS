import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: "20em",
    float: "right",
    top: "5em",
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      width: "98%",
      float: "none",
      top: "unset",
    },
  },
}));

const MovieFilterBox = ({ filterByText }) => {
  const classes = useStyles();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const search = e.target.value;
    setValue(search);
    filterByText(search);
  };

  return (
    <div>
      <FormControl fullWidth size="small" className={classes.margin}>
        <OutlinedInput
          id="mjs-filter-box"
          value={value}
          onChange={handleChange}
          placeholder={"Search My Movies"}
          type="search"
        />
      </FormControl>
    </div>
  );
};

export default MovieFilterBox;
