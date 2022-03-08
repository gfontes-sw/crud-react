import React, { useEffect, useContext, useState /* , useRef  */ } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
/* import { Toast } from "primereact/toast"; */
import "./products.scss";
import GetProducts from "../components/GetProducts";
import Header from "../components/Header";
import ProductContext from "../context/ProductContext";

const Products = () => {
  const productCtx = useContext(ProductContext);
  const [products, setProducts] = useState([]);

  const columns = [
    { field: "id", header: "Id" },
    { field: "title", header: "Title" },
    { field: "category", header: "Category" },
    { field: "price", header: "Price" },
  ];

  const dynamicColumns = () =>
    columns.map(col => {
      return <Column key={col.field} field={col.field} header={col.header} />;
    });
  /*   const myToast = useRef(null);

  const showToast = (severityValue, summaryValue, detailValue, lifeValue) => {
    myToast.current.show({ severity: severityValue, summary: summaryValue, detail: detailValue, life: lifeValue });
  };
 */
  useEffect(() => {
    setProducts(productCtx.items.data);
    /*  productCtx.error && showToast("error", "Error Message", " Couldnt sent your request !", 3000) */
  }, []);

  return (
    <>
      <Header />
      <div>
        <GetProducts />
      </div>
      <div id="productsContainer">
        <div className="datatable-filter-demo">
          <div className="card">
            <DataTable value={products} responsiveLayout="scroll">
              {dynamicColumns()}
            </DataTable>
          </div>
        </div>
        {/*    <Toast ref={myToast} /> */}
      </div>
    </>
  );
};

export default Products;
