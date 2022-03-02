import React from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css"; // primeng theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css"; // icons

import "../styles/shared.scss";
import { ThemeProvider } from "styled-components";
import lightTheme from "../theme/lightTheme";

import AppRouter from "./AppRouter";
import { LoginProvider } from "../context/LoginContext";
import { ProductProvider } from "../context/ProductContext";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <LoginProvider>
        <ProductProvider>
          <AppRouter />
        </ProductProvider>
      </LoginProvider>
    </ThemeProvider>
  );
};

export default App;
