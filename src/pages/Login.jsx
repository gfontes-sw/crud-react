import React, { useRef, useState } from "react";
import "./login.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // primeng theme
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

import useAppContext from "../context/LoginContext";

const Login = () => {
  const { setLogin, loginState } = useAppContext();
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
    const fetchUser = async () => {
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      };
      try {
        const fetchResponse = await fetch("https://localhost:44315/api/Account/authenticate", settings);
        const data = await fetchResponse.json();
        return data.data;
      } catch (err) {
        return err;
      }
    };
    const userToken = await fetchUser();
    if (userToken) {
      setLogin({
        isLogged: true,
        isToken: userToken.jwToken,
      });
      navigate("/home");
    } else {
      setLogin({
        error: true,
      });
    }
  };

  return (
    <div className="container">
      <Card>
        <h3>Login here</h3>
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
  );
};

export default Login;
