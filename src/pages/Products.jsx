/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { CustomerService } from "../services/CustomerService";
import "./products.scss";
import GetProducts from "../components/GetProducts";
import Header from "../components/Header";
import useProductContext from "../context/ProductContext";

const Products = () => {
  const [customers1, setCustomers1] = useState(null);
  const [filters1, setFilters1] = useState(null);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [loading1, setLoading1] = useState(true);
  const location = useLocation();
  const { productState } = useProductContext();

  const gotProducts = location?.state;

  const representatives = [
    { name: "Amy Elsner", image: "amyelsner.png" },
    { name: "Anna Fali", image: "annafali.png" },
    { name: "Asiya Javayant", image: "asiyajavayant.png" },
    { name: "Bernardo Dominic", image: "bernardodominic.png" },
    { name: "Elwin Sharvill", image: "elwinsharvill.png" },
    { name: "Ioni Bowcher", image: "ionibowcher.png" },
    { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
    { name: "Onyama Limba", image: "onyamalimba.png" },
    { name: "Stephen Shaw", image: "stephenshaw.png" },
    { name: "XuXue Feng", image: "xuxuefeng.png" },
  ];

  const customerService = new CustomerService();

  useEffect(() => {
    customerService.getCustomersLarge().then(data => {
      setCustomers1(getCustomers(data));
      setLoading1(false);
    });
    initFilters1();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getCustomers = data => {
    return [...(data || [])].map(d => {
      d.date = new Date(d.date);
      return d;
    });
  };

  const formatDate = value => {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const onGlobalFilterChange1 = e => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      "country.name": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      representative: { value: null, matchMode: FilterMatchMode.IN },
      date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
      balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
      status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    setGlobalFilterValue1("");
  };

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Keyword Search" />
        </span>
      </div>
    );
  };

  const countryBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <img
          alt="flag"
          src="/images/flag/flag_placeholder.png"
          onError={e => (e.target.src = "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")}
          className={`flag flag-${rowData.country.code}`}
          width={30}
        />
        <span className="image-text">{rowData.country.name}</span>
      </React.Fragment>
    );
  };

  const filterClearTemplate = options => {
    return (
      <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} className="p-button-secondary"></Button>
    );
  };

  const filterApplyTemplate = options => {
    return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} className="p-button-success"></Button>;
  };

  const filterFooterTemplate = () => {
    return <div className="px-3 pt-0 pb-3 text-center font-bold">Customized Buttons</div>;
  };

  const representativeBodyTemplate = rowData => {
    debugger;
    const representative = rowData.representative;
    console.log(gotProducts);
    return (
      <React.Fragment>
        <img
          alt={representative.name}
          src={`images/avatar/${representative.image}`}
          onError={e => (e.target.src = "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")}
          width={32}
          style={{ verticalAlign: "middle" }}
        />
        <span className="image-text">{representative.name}</span>
      </React.Fragment>
    );
  };

  const representativeFilterTemplate = options => {
    return (
      <MultiSelect
        value={options.value}
        options={representatives}
        itemTemplate={representativesItemTemplate}
        onChange={e => options.filterCallback(e.value)}
        optionLabel="name"
        placeholder="Any"
        className="p-column-filter"
      />
    );
  };

  const representativesItemTemplate = option => {
    return (
      <div className="p-multiselect-representative-option">
        <img
          alt={option.name}
          src={`images/avatar/${option.image}`}
          onError={e => (e.target.src = "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")}
          width={32}
          style={{ verticalAlign: "middle" }}
        />
        <span className="image-text">{option.name}</span>
      </div>
    );
  };

  const dateBodyTemplate = rowData => {
    return formatDate(rowData.date);
  };

  const dateFilterTemplate = options => {
    return (
      <Calendar
        value={options.value}
        onChange={e => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const header1 = renderHeader1();

  useEffect(() => {
    console.log(productState.isProducts);
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
            <DataTable
              value={customers1}
              paginator
              className="p-datatable-customers"
              showGridlines
              rows={10}
              dataKey="id"
              filters={filters1}
              filterDisplay="menu"
              /*  loading={loading1} */
              responsiveLayout="scroll"
              globalFilterFields={["name", "country.name", "representative.name", "balance", "status"]}
              header={header1}
              emptyMessage="No products found.">
              <Column field="title" header="Title" filter filterPlaceholder="Search by name" style={{ minWidth: "12rem" }} />
              <Column
                header="Price"
                field="price"
                filterField="country.name"
                style={{ minWidth: "12rem" }}
                body={countryBodyTemplate}
                filter
                filterPlaceholder="Search by country"
                filterClear={filterClearTemplate}
                filterApply={filterApplyTemplate}
                filterFooter={filterFooterTemplate}
              />
              <Column
                header="Description"
                field="description"
                filterField="representative"
                showFilterMatchModes={false}
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "14rem" }}
                body={representativeBodyTemplate}
                filter
                filterElement={representativeFilterTemplate}
              />
              <Column
                header="Image"
                field="image"
                filterField="date"
                dataType="date"
                style={{ minWidth: "10rem" }}
                body={dateBodyTemplate}
                filter
                filterElement={dateFilterTemplate}
              />
              <Column
                header="Category"
                field="category"
                filterField="date"
                dataType="date"
                style={{ minWidth: "10rem" }}
                body={dateBodyTemplate}
                filter
                filterElement={dateFilterTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
