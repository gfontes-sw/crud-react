import React, { useContext } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import "./header.scss";
import AuthContext from "../context/LoginContext";

const Header = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const username = localStorage.getItem("userData");

  const handleClick = () => {
    navigate("/private/products");
  };

  const tabHeaderProducts = () => {
    return <Button className="products" icon="pi pi-book" label="Products" onClick={handleClick} />;
  };

  const tabHeaderUser = options => {
    const items = [
      { label: `User: ${username}`, icon: "pi pi-user" },
      {
        label: "Logout",
        icon: "pi pi-times",
        command: () => {
          authCtx.logout();
          navigate("/");
        },
      },
    ];
    return <SplitButton label="" icon="pi pi-user" onClick={options.onClick} className="px-2" model={items} />;
  };

  return (
    <div id="headerContainer">
      <TabView>
        <TabPanel headerTemplate={tabHeaderProducts} header="Products" leftIcon="pi pi-calendar" />
        <TabPanel headerTemplate={tabHeaderUser} headerClassName="flex align-items-center" />
      </TabView>
    </div>
  );
};

export default Header;
