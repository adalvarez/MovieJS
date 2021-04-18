import React from "react";
import { render } from "react-dom";
import App from "./App";
import theMovieDb from "themoviedb-javascript-library";
theMovieDb.common.api_key = process.env.REACT_APP_MOVIE_KEY;
theMovieDb.common.base_uri = "https://api.themoviedb.org/3/";

render(<App />, document.getElementById("root"));
