import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import useAppContext from "../context/LoginContext";

const AuthCheck = ({ children }) => {
  const { loginState } = useAppContext();

  return loginState.isLogged ? children : <Redirect to="/" />;
};

AuthCheck.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthCheck;
