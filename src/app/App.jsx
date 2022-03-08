import React from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css"; // primeng theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css"; // icons

import "../styles/shared.scss";
import { ThemeProvider } from "styled-components";
import lightTheme from "../theme/lightTheme";

import AppRouter from "./AppRouter";
import { ProductContextProvider } from "../context/ProductContext";
import { AuthContextProvider } from "../context/LoginContext";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <ProductContextProvider>
        <AuthContextProvider>
          <AppRouter />
        </AuthContextProvider>
      </ProductContextProvider>
    </ThemeProvider>
  );
};

export default App;
