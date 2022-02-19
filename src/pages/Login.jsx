import React, { useState } from "react";
import "./login.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // primeng theme
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
/* import { useNavigate } from "react-router-dom"; */
import useAppContext from "../context/LoginContext";

import ErrorModal from "../components/ErrorModal";

const Login = () => {
  const [modalShown, setModalShown] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { setLogin } = useAppContext();
  /*  const navigate = useNavigate(); */

  /*   const showModalHandler = () => {
    setModalShown(true);
  };
 */
  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    setModalShown(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLogin(true);
    /*     navigate("/home"); */
    setModalShown(true);
  };

  return (
    <div className="container">
      <Card>
        <h3>Login here</h3>
        <form onSubmit={handleSubmit}>
          <InputText type="text" name="username" placeholder="Username" onChange={handleChange} value={form.username} required />

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
      {modalShown === true && <ErrorModal />}
    </div>
  );
};

export default Login;
