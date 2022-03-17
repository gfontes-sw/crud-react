import React, { useState, useContext, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import Header from "./Header";
import postProducts from "../services/postProducts";
import ProductContext from "../context/ProductContext";
import "./addProducts.scss";
import getProducts from "../services/getProducts";

const AddProducts = () => {
  const navigate = useNavigate();
  /*   const [showMessage, setShowMessage] = useState(false); */

  const defaultValues = {
    name: "",
    barcode: "",
    description: "",
    rate: "",
  };
  const [formData, setFormData] = useState(defaultValues);
  const productCtx = useContext(ProductContext);
  const myToast = useRef(null);

  const showToast = (severityValue, summaryValue, detailValue, lifeValue) => {
    myToast.current.show({ severity: severityValue, summary: summaryValue, detail: detailValue, life: lifeValue });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const productData = await postProducts(formData);
    if (productData) {
      const allProducts = await getProducts();
      console.log("allproducts", allProducts);
      productCtx.addItems(allProducts.data.items);
      productCtx.setGotItems(true);
      navigate("/private/products");
    } else {
      productCtx.error = true;
    }
  };
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCancel = () => {
    navigate("/private/products");
  };

  return (
    <>
      <Header />
      <div id="addProductContainer">
        <div className="form-demo">
          <div className="flex justify-content-center">
            <div className="card">
              <h5 className="text-center">Register</h5>
              <form onSubmit={handleSubmit} className="p-fluid">
                <div className="field">
                  <span className="p-float-label">
                    <InputText name="name" value={formData.name} onChange={handleChange} required />
                    <label htmlFor="name">Name*</label>
                  </span>
                </div>
                <div className="field">
                  <span className="p-float-label p-input-icon-right">
                    <InputText name="barcode" value={formData.barcode} onChange={handleChange} required />
                    <label htmlFor="barcode">Barcode*</label>
                  </span>
                </div>
                <div className="field">
                  <span className="p-float-label">
                    <InputText name="description" value={formData.description} onChange={handleChange} required />
                    <label htmlFor="description">Description*</label>
                  </span>
                </div>
                <div className="field">
                  <span className="p-float-label">
                    <InputText name="rate" value={formData.rate} onChange={handleChange} required />
                    <label htmlFor="rate">Rate*</label>
                  </span>
                </div>
                <Button
                  type="submit"
                  label="Submit"
                  className="mt-2"
                  onClick={() =>
                    productCtx.error && showToast("error", "Error Message", " We couldnt save your product, try again !", 3000)
                  }
                />
              </form>
              <Button type="button" label="Cancel" onClick={onCancel} className="mt-1" />
            </div>
          </div>
          <Toast ref={myToast} />
        </div>
      </div>
    </>
  );
};

export default AddProducts;
