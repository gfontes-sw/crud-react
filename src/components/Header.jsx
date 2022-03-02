import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
/* import PropTypes from "prop-types"; */
import useAppContext from "../context/LoginContext";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  const { removeToken, loginState, dataState } = useAppContext();

  const handleClick = () => {
    navigate("/private/products");
  };

  const tabHeaderProducts = () => {
    return <Button className="products" icon="pi pi-book" label="Products" onClick={handleClick} />;
  };
  console.log(loginState);
  const tabHeaderUser = options => {
    const items = [
      { label: dataState.email, icon: "pi pi-user" },
      {
        label: "Logout",
        icon: "pi pi-times",
        command: () => {
          removeToken();
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

/* Header.propTypes = {
  userData: PropTypes.string.isRequired,
};
 */
