import React, { useState } from "react";
import "./login.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // primeng theme
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
/* import useAppContext from "../context/LoginContext"; */
import { useToken } from "../hooks/useToken";

import ErrorModal from "../components/ErrorModal";

const Login = () => {
  /* const { setLogin } = useAppContext(); */

  const [modalShown, setModalShown] = useState(false);

  const { setToken } = useToken();

  const [form, setForm] = useState({
    email: "superadmin@gmail.com",
    password: "123Pa$$word!",
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    setModalShown(false);
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
    console.log(userToken);
    if (userToken) {
      setToken(userToken.jwToken);
      navigate("/home");
    } else setModalShown(true);
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
            <Button type="submit" label="Log in" className="mt-2" />
          </div>
        </form>
      </Card>
      {modalShown && <ErrorModal />}
    </div>
  );
};

export default Login;
