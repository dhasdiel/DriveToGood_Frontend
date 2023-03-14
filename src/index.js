import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/sign/SignUp";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./style/theme";
import Chat from "./components/chat/main";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path= "NewRide" element={<App new/>} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
);
