import React, { useState } from "react";
import "./login.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // primeng theme
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import useAppContext from "../context/LoginContext";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { setLogin } = useAppContext();
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLogin(true);
    navigate("/home");
  };

  return (
    <div className="container">
      <Card>
        <h3>Login here</h3>
        <form onSubmit={handleSubmit}>
          <InputText type="text" name="username" placeholder="Username" onChange={handleChange} value={form.username} required />
          <span className="">Username</span>
          <InputText type="text" name="password" placeholder="Password" onChange={handleChange} value={form.password} required />
          <span className="">Password</span>
          <div className="button">
            <Button type="submit" label="Log in" className="mt-2" />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
