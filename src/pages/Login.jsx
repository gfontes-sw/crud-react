import React, { useRef, useState, useContext, useEffect } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // primeng theme
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

import authenticateUser from "../services/authenticateUser";
import AuthContext from "../context/LoginContext";

import "./login.scss";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const isLogged = authCtx.isLoggedIn;

  const [form, setForm] = useState({
    email: "superadmin@gmail.com",
    password: "123Pa$$word!",
  });

  const myToast = useRef(null);

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const showToast = (severityValue, summaryValue, detailValue, lifeValue) => {
    myToast.current.show({ severity: severityValue, summary: summaryValue, detail: detailValue, life: lifeValue });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const userToken = await authenticateUser(form);
    console.log(userToken);
    if (userToken) {
      authCtx.login(userToken.jwToken, userToken.userName);
      navigate("/private");
    } else {
      authCtx.error = true;
    }
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/private");
    }
  }, [isLogged]);

  return (
    <div id="loginContainer">
      <div className="container">
        <Card>
          <h2>Login here</h2>
          <form onSubmit={handleSubmit}>
            <InputText type="text" name="email" placeholder="Email" onChange={handleChange} value={form.email} required />
            <InputText
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
              required
            />
            <div className="button">
              <Button
                type="submit"
                label="Log in"
                className="mt-2"
                onClick={() =>
                  authCtx.error && showToast("error", "Error Message", " The Email or Password is incorrect !", 3000)
                }
              />
            </div>
          </form>
        </Card>
        <Toast ref={myToast} />
      </div>
    </div>
  );
};

export default Login;
