import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAppContext from "../context/LoginContext";

export const PrivateRoute = ({ children }) => {
  const { loginState } = useAppContext();
  return loginState.isLogged ? children : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
