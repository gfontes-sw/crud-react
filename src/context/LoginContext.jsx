import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";

const LoginContext = createContext({});

const initialState = {
  isLogged: false,
  isLoading: false,
  error: false,
  isToken: null,
};

const thisState = () => {
  const gotToken = localStorage.getItem("isToken");
  if (gotToken) {
    return {
      isLogged: true,
      isToken: gotToken,
    };
  }
  return initialState;
};

export const LoginProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(thisState());

  const setLogin = value => {
    setLoginState(value);
  };

  const removeToken = () => {
    localStorage.removeItem("isToken");
  };

  useEffect(() => {
    if (loginState.isToken) {
      localStorage.setItem("isToken", JSON.stringify(loginState.isToken));
    }
  }, [loginState]);

  useEffect(() => {
    const saveToken = localStorage.getItem("isToken");
    if (saveToken) {
      setLoginState({ isToken: JSON.parse(saveToken), isLogged: true });
    }
  }, []);

  const contextLoginValues = useMemo(() => {
    return {
      loginState,
      setLogin,
      removeToken,
    };
  }, [loginState]);

  return <LoginContext.Provider value={contextLoginValues}>{children}</LoginContext.Provider>;
};

const useAppContext = () => useContext(LoginContext);

export default useAppContext;

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
