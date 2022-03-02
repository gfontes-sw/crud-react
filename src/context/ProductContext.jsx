import React, { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const ProductContext = createContext({});

const initialState = {
  gotProducts: false,
  isLoading: false,
  error: false,
  isProducts: {},
};

export const ProductProvider = ({ children }) => {
  const [productState, setProductState] = useState(initialState);

  const setProduct = value => {
    setProductState(value);
  };

  const contextProductValues = useMemo(() => {
    return {
      productState,
      setProduct,
    };
  }, [productState]);

  return <ProductContext.Provider value={contextProductValues}>{children}</ProductContext.Provider>;
};

const useProductContext = () => useContext(ProductContext);

export default useProductContext;

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
