import React, { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const ProductContext = createContext({
  gotItems: false,
  setGotItems: () => {},
  error: false,
  setError: () => {},
  items: {},
  addItems: () => {},
  removeItems: () => {},
});

export const ProductContextProvider = ({ children }) => {
  const [itemState, setItemState] = useState({});
  const [gotItems, setGotItems] = useState(false);
  const [error, setError] = useState(false);

  const getItem = items => {
    setItemState(items);
  };

  const removeItem = id => {
    setItemState(id);
  };

  const contextProductValues = useMemo(() => {
    return {
      addItems: getItem,
      removeItems: removeItem,
      items: itemState,
      gotItems,
      setGotItems,
      error,
      setError,
    };
  }, [itemState]);

  return <ProductContext.Provider value={contextProductValues}>{children}</ProductContext.Provider>;
};

export default ProductContext;

ProductContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
