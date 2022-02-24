import { Button } from "primereact/button";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../context/LoginContext";

const Home = () => {
  const navigate = useNavigate();
  const { loginState, removeToken } = useAppContext();

  const handleClick = () => {
    removeToken();
    navigate("/");
  };

  useEffect(() => {
    if (!loginState.isLogged) {
      navigate("/");
    }
  }, [loginState]);

  return (
    <div>
      <div className="title">
        <h1>Welcome </h1>
      </div>

      {loginState.isLogged === true && (
        <div>
          {" "}
          <Button type="button" onClick={handleClick}>
            Log out{" "}
          </Button>
        </div>
      )}
    </div>
  );
};
export default Home;
