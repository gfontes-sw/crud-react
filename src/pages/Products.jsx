/* eslint-disable */
import React, { useEffect, useContext, useState /* , useRef  */ } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
/* import { Toast } from "primereact/toast"; */
import "./products.scss";
import GetProducts from "../components/GetProducts";
import Header from "../components/Header";
import ProductContext from "../context/ProductContext";
import { deleteProducts } from "../services/deleteProduct";
import getProducts from "../services/getProducts";
import { updateProduct } from "../services/updateProduct";

/* import { deleteProducts } from "../services/deleteProduct"; */
/* import DataTableCrudDemo from "../components/dataTable"; */

const Products = () => {
  const productCtx = useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [editableProduct,setEditableProduct] =useState(null)
  /*  const productsList = localStorage.getItem("products") */
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  /* 
  const [product, setProduct] = useState(emptyProduct); */

  const columns = [
    { field: "name", header: "Name" },
    { field: "barcode", header: "Barcode" },
    { field: "description", header: "Description" },
    { field: "rate", header: "Rate" },
  ];

  /*   const handleDelete = async id => {
    try {
      const response = await deleteProducts(id);
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }; */

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const dynamicColumns = () =>
    columns.map(col => {
      return <Column key={col.field} field={col.field} header={col.header} />;
    });
  /*   const myToast = useRef(null);

  const showToast = (severityValue, summaryValue, detailValue, lifeValue) => {
    myToast.current.show({ severity: severityValue, summary: summaryValue, detail: detailValue, life: lifeValue });
  };
 */

  const deleteSelectedProducts = () => {
    //let _products = products.filter(val => !selectedProducts.includes(val));
    // setProducts(_products);
    // setSelectedProducts(null);
    //toast.current.show({ severity: "success", summary: "Successful", detail: "Products Deleted", life: 3000 });
  };
  const saveProduct = async product => {
    debugger;
    setSubmitted(true);
    try {
      const response = await updateProduct(editableProduct);
      if (response.status === 204) {
        console.log(response);
        hideDialog()
        getProductsHandler()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
    </React.Fragment>
  );

  const editProduct = async product => {
    setProductDialog(true);
   setEditableProduct(product)
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const getProductsHandler = async () => {
    const allProducts = await getProducts();
    productCtx.addItems(allProducts.data.items);
    productCtx.setGotItems(true);
  };

  const confirmDeleteProduct = async product => {
    try {
      const response = await deleteProducts(product.id);
      if (response.status === 204) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
    getProductsHandler();
  };

  useEffect(() => {
    getProductsHandler();
  }, []);

  useEffect(() => {
    setProducts(productCtx.items);
  }, [productCtx]);

  const actionBodyTemplate = rowData => {
    debugger;
    return (
      <>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
      </>
    );
  };

  /* const deleteProductDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
    </React.Fragment>
  ); */

  const onInputChange = (e,key) => {
    setEditableProduct({...editableProduct,[key]:e.target.value})
  }

  return (
    <>
      <Header />
      <div>
        <GetProducts />
      </div>
      <div id="productsContainer">
        <div className="datatable-filter-demo">
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
              <InputText
                id="name"
                value={editableProduct?.name}
                onChange={e => onInputChange(e, "name")}
                required
                autoFocus
                /* className={classNames({ "p-invalid": submitted && !editableProduct?.name })} */
              />
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
                <InputNumber id="rate" value={editableProduct?.rate}  onValueChange={e => onInputChange(e, "rate")} />
              </div>
            </div>
          </Dialog>
        </div>
        {/*    <Toast ref={myToast} /> */}
      </div>
      {/*       <DataTableCrudDemo /> */}
    </>
  );
};

export default Products;
