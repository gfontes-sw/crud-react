import React from "react";
import AppRouter from "./AppRouter";
import { LoginProvider } from "../context/LoginContext";

const App = () => {
  return (
    <LoginProvider>
      <AppRouter />
    </LoginProvider>
  );
};

export default App;
