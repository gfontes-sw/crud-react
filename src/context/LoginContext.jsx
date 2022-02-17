import React, { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const LoginContext = createContext({});

const initialState = {
  isLogged: false,
  isLoading: false,
  error: false,
};

export const LoginProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(initialState);

  const setLogin = value => {
    setLoginState({
      isLogged: value,
    });
  };

  const contextLoginValues = useMemo(() => {
    return {
      loginState,
      setLogin,
    };
  }, [loginState]);

  return <LoginContext.Provider value={contextLoginValues}>{children}</LoginContext.Provider>;
};

const useAppContext = () => useContext(LoginContext);

export default useAppContext;

LoginProvider.propTypes = {
  children: PropTypes.objectOf().isRequired,
};
