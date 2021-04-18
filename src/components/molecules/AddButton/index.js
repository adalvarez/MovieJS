import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none",
    "& .MuiButton-startIcon": {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: 32,
      paddingLeft: 8,
      paddingRight: 8,
      "& .MuiButton-startIcon": {
        margin: 0,
        display: "inherit",
      },
    },
  },
  buttonText: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const AddButton = ({ addEvent }) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      startIcon={<AddIcon />}
      onClick={addEvent}
    >
      <span className={classes.buttonText}>Add to Unwatched</span>
    </Button>
  );
};

export default AddButton;
