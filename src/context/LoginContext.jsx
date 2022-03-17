import React, { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  error: false,
  login: () => {},
  logout: () => {},
  userData: "",
});

export const AuthContextProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const initialData = localStorage.getItem("userData");
  const [token, setToken] = useState(initialToken);
  const [userData, setUserData] = useState(initialData);

  const userIsLoggedIn = !!token;

  const loginHandler = (isToken, userInfo) => {
    setToken(isToken);
    setUserData(userInfo);
    localStorage.setItem("token", isToken);
    localStorage.setItem("userData", userInfo);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  const contextValue = useMemo(() => {
    return {
      token,
      isLoggedIn: userIsLoggedIn,
      login: loginHandler,
      logout: logoutHandler,
      userData,
    };
  }, [userIsLoggedIn]);

  return <AuthContext.Provider value={contextValue}>{children} </AuthContext.Provider>;
};

export default AuthContext;

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
