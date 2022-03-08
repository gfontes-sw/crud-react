import React, { useState, useContext /* , useRef  */ } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
/* import { Toast } from "primereact/toast"; */
/* import { Dialog } from "primereact/dialog"; */
import { useNavigate } from "react-router-dom";
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
    description: "",
    barcode: "",
    rate: "",
    productCategoryId: "",
  };
  const [formData, setFormData] = useState(defaultValues);
  /*  const myToast = useRef(null); */
  const productCtx = useContext(ProductContext);

  /*   const showToast = (severityValue, summaryValue, detailValue, lifeValue) => {
    myToast.current.show({ severity: severityValue, summary: summaryValue, detail: detailValue, life: lifeValue });
  }; */

  const handleSubmit = async e => {
    e.preventDefault();
    const productData = await postProducts(formData);
    console.log("thisProd", productData);
    if (productData) {
      const allProducts = await getProducts();
      console.log("allproducts", allProducts);
      productCtx.addItems(allProducts);
      productCtx.setGotItems(true);
      navigate("/private/products");
    }
    /*  setShowMessage(true); */
  };
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
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
                    <InputText name="barcode" value={formData.barcode} onChange={handleChange} />
                    <label htmlFor="name">barcode*</label>
                  </span>
                </div>
                <div className="field">
                  <span className="p-float-label p-input-icon-right">
                    <InputText name="name" value={formData.name} onChange={handleChange} />
                    <label htmlFor="price">Name*</label>
                  </span>
                </div>
                <div className="field">
                  <span className="p-float-label">
                    <InputText name="rate" value={formData.rate} onChange={handleChange} />
                    <label htmlFor="description">Rate*</label>
                  </span>
                </div>
                <div className="field">
                  <span className="p-float-label">
                    <InputText name="description" value={formData.description} onChange={handleChange} />
                    <label htmlFor="description">Description*</label>
                  </span>
                </div>
                <Button type="submit" label="Submit" className="mt-2" />
              </form>
              <Button type="button" label="Cancel" onClick={onCancel} className="mt-1" />
              {/*  {productCtx.error && showToast("error", "Error Message", " Couldnt sent your request !", 3000)}
              <Toast ref={myToast} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
