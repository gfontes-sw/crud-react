import React, { useEffect, useContext, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import "./products.scss";
import GetProducts from "../components/GetProducts";
import Header from "../components/Header";
import ProductContext from "../context/ProductContext";
import { deleteProducts } from "../services/deleteProduct";
import getProducts from "../services/getProducts";
import { updateProduct } from "../services/updateProduct";

const Products = () => {
  const productCtx = useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [editableProduct, setEditableProduct] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toast = useRef(null);

  const columns = [
    { field: "name", header: "Name" },
    { field: "barcode", header: "Barcode" },
    { field: "description", header: "Description" },
    { field: "rate", header: "Rate" },
  ];

  const dynamicColumns = () =>
    columns.map(col => {
      return <Column key={col.field} field={col.field} header={col.header} />;
    });

  const saveProduct = async () => {
    setSubmitted(true);
    try {
      const response = await updateProduct(editableProduct);
      if (response.status === 204) {
        console.log(response);
        hideDialog();
        getProductsHandler();
        toast.current.show({ severity: "success", summary: "Successful", detail: "Product Updated", life: 3000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async product => {
    try {
      const response = await deleteProducts(product.id);
      if (response.status === 204) {
        console.log(response);
        toast.current.show({ severity: "success", summary: "Successful", detail: "Product Deleted", life: 3000 });
      }
    } catch (error) {
      console.log(error);
    }
    getProductsHandler();
  };

  const getProductsHandler = async () => {
    const allProducts = await getProducts();
    productCtx.addItems(allProducts.data.items);
    productCtx.setGotItems(true);
  };

  useEffect(() => {
    getProductsHandler();
  }, []);

  useEffect(() => {
    setProducts(productCtx.items);
  }, [productCtx]);

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const editProduct = product => {
    setProductDialog(true);
    setEditableProduct(product);
  };

  const onInputChange = (e, key) => {
    setEditableProduct({ ...editableProduct, [key]: e.target.value });
  };

  const productDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
    </>
  );

  const actionBodyTemplate = rowData => {
    return (
      <>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => deleteProduct(rowData)} />
      </>
    );
  };

  return (
    <>
      <Header />
      <div>
        <GetProducts />
      </div>
      <div id="productsContainer">
        <div className="datatable-filter-demo">
          <Toast ref={toast} />
          <div className="card">
            <DataTable
              value={products}
              responsiveLayout="scroll"
              selection={selectedProducts}
              onSelectionChange={e => setSelectedProducts(e.value)}
              dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}>
              {dynamicColumns()}
              <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: "8rem" }} />
            </DataTable>
          </div>
          <Dialog
            visible={productDialog}
            style={{ width: "450px" }}
            header="Product Details"
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText id="name" value={editableProduct?.name} onChange={e => onInputChange(e, "name")} required autoFocus />
              {submitted && !editableProduct?.name && <small className="p-error">Name is required.</small>}
            </div>
            <div className="field">
              <label htmlFor="description">Description</label>
              <InputText
                id="description"
                value={editableProduct?.description}
                onChange={e => onInputChange(e, "description")}
                required
                rows={3}
                cols={20}
              />
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="rate">Rate</label>
                <InputNumber required id="rate" value={editableProduct?.rate} onValueChange={e => onInputChange(e, "rate")} />
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default Products;
