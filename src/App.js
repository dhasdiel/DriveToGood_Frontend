import React from "react";

import { Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./style/theme";

import BottomAppBar from "./components/BottomAppBar";
import UpAppBar from "./components/UpAppBar";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <UpAppBar />
        <BottomAppBar />
      </ThemeProvider>
    </>
  );
}

export default App;
