import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../context/LoginContext";

export const PrivateRoute = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const isLogged = authCtx.isLoggedIn;

  return isLogged ? children : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
