import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Home from "./components/pages/Home";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6558f5",
      light: "#9188f8",
      dark: "#3928f2",
    },
    background: {
      default: "#fff",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <Home />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
