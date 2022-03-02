import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import "./getProducts.scss";

const GetProducts = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/private/products/create");
  };
  return (
    <div id="getProductContainer">
      <Card>
        <h2 className="pi pi-book">Products</h2>
        <Button label="+ New Product" onClick={handleClick} />
      </Card>
    </div>
  );
};

export default GetProducts;
