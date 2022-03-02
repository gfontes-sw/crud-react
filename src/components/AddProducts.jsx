import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import saveProducts from "../services/saveProducts";
import Header from "./Header";
import useProductContext from "../context/ProductContext";
import "./addProducts.scss";

const AddProducts = () => {
  const { setProduct } = useProductContext();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const defaultValues = {
    title: "",
    price: 13.5,
    description: "lorem ipsum set",
    image: "https://i.pravatar.cc",
    category: "electronic",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = async data => {
    const productData = await saveProducts(data);
    /*  debugger; */
    if (productData) {
      setProduct({ gotProducts: true, isProducts: { ...data } });
      setFormData(data);
      console.log(formData);
      setShowMessage(true);
      navigate("/private/products");
    }
    console.log(`this data comes from formData ${formData}`);
    reset();
  };

  const onCancel = () => {
    navigate("/private/products");
  };

  const getFormErrorMessage = name => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} />
    </div>
  );

  return (
    <>
      <Header />
      <div id="addProductContainer">
        <div className="form-demo">
          <div className="flex justify-content-center">
            <Card>
              <h2 className="pi pi-book">New Product</h2>
              <Button type="button" label="Cancel" onClick={onCancel} className="mt-1" />
              <Button type="submit" onClick={onSubmit} label="Create" className="mt-2" />
            </Card>
            <div className="card">
              <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: "Please enter a name" }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.name}
                          {...field}
                          autoFocus
                          className={classNames({ "p-invalid": fieldState.invalid })}
                        />
                      )}
                    />
                    <label htmlFor="name" className={classNames({ "p-error": errors.name })}>
                      Name *
                    </label>
                  </span>
                  {getFormErrorMessage("name")}
                </div>
                <div className="field">
                  <span className="p-float-label p-input-icon-right">
                    <Controller
                      name="price"
                      control={control}
                      rules={{
                        required: "Barcode is required.",
                      }}
                      render={({ field, fieldState }) => (
                        <InputText id={field.name} {...field} className={classNames({ "p-invalid": fieldState.invalid })} />
                      )}
                    />
                    <label htmlFor="barcode" className={classNames({ "p-error": !!errors.barcode })}>
                      Barcode*
                    </label>
                  </span>
                  {getFormErrorMessage("barcode")}
                </div>
                <div className="field">
                  <span className="p-float-label p-input-icon-right">
                    <Controller
                      name="image"
                      control={control}
                      rules={{
                        required: "Barcode is required.",
                      }}
                      render={({ field, fieldState }) => (
                        <InputText id={field.name} {...field} className={classNames({ "p-invalid": fieldState.invalid })} />
                      )}
                    />
                    <label htmlFor="barcode" className={classNames({ "p-error": !!errors.barcode })}>
                      Barcode*
                    </label>
                  </span>
                  {getFormErrorMessage("barcode")}
                </div>
                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="description"
                      control={control}
                      rules={{ required: "Description is required." }}
                      render={({ field, fieldState }) => (
                        <InputText id={field.name} {...field} className={classNames({ "p-invalid": fieldState.invalid })} />
                      )}
                    />
                    <label htmlFor="description" className={classNames({ "p-error": errors.description })}>
                      Description *
                    </label>
                  </span>
                  {getFormErrorMessage("description")}
                </div>
                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="category"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputText id={field.name} {...field} className={classNames({ "p-invalid": fieldState.invalid })} />
                      )}
                    />
                    <label htmlFor="rate" className={classNames({ "p-error": errors.rate })}>
                      Rate *
                    </label>
                  </span>
                </div>
              </form>
            </div>
          </div>
          {showMessage && (
            <Dialog
              visible={showMessage}
              onHide={() => setShowMessage(false)}
              position="top"
              footer={dialogFooter}
              showHeader={false}
              breakpoints={{ "960px": "80vw" }}
              style={{ width: "30vw" }}>
              <div className="flex justify-content-center flex-column pt-6 px-3">
                <i className="pi pi-check-circle" style={{ fontSize: "5rem", color: "var(--green-500)" }} />
                <h5>Product added!</h5>
                {/*    <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please
            check <b>{formData.email}</b> for activation instructions.
          </p> */}
              </div>
            </Dialog>
          )}
        </div>
      </div>
    </>
  );
};

export default AddProducts;
