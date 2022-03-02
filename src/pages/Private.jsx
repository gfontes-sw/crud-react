import React from "react";
import { Card } from "primereact/card";
import Header from "../components/Header";
import "./private.scss";

const Private = () => {
  return (
    <>
      <Header />
      <div id="privateContainer">
        <Card className="welcome">
          <h1 className="pi pi-user">Welcome</h1>
        </Card>
      </div>
    </>
  );
};
export default Private;
