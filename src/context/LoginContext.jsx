import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";

const LoginContext = createContext({});

const initialState = {
  isLogged: false,
  isLoading: false,
  error: false,
  isToken: null,
  /*  userIdentify: "", */
};

const initialUserData = {
  email: "",
  password: "",
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
  const [dataState, setDataState] = useState(initialUserData);

  const setLogin = value => {
    setLoginState(value);
  };

  const showDataState = value => {
    setDataState(value);
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
  }, [loginState.isToken]);

  const contextLoginValues = useMemo(() => {
    return {
      loginState,
      setLogin,
      removeToken,
      showDataState,
      dataState,
    };
  }, [loginState]);

  return <LoginContext.Provider value={contextLoginValues}>{children}</LoginContext.Provider>;
};

const useAppContext = () => useContext(LoginContext);

export default useAppContext;

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
