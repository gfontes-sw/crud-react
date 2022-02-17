import React from "react";
import "./login.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // primeng theme
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import useAppContext from "../context/LoginContext";

const Login = () => {
  const { setLogin } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="container">
      <Card>
        <h3>Login here</h3>
        <InputText />
        <span className="">Username</span>
        <InputText />
        <span className="">Password</span>
        <div className="button">
          <Button
            label="Log In"
            onClick={() => {
              setLogin(true);
              navigate("/home");
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default Login;
