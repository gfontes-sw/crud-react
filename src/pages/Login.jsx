import React, { useRef, useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // primeng theme
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

import saveUser from "../services/saveUser";
import useAppContext from "../context/LoginContext";

import "./login.scss";

const Login = () => {
  const { setLogin, loginState, showDataState } = useAppContext();
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
    const userToken = await saveUser(form);
    if (userToken) {
      setLogin({
        isLogged: true,
        isToken: userToken.jwToken,
      });
      showDataState(form);
      navigate("/private");
    } else {
      setLogin({
        error: true,
      });
    }
  };

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
                  loginState.error && showToast("error", "Error Message", " The Email or Password is incorrect !", 3000)
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
