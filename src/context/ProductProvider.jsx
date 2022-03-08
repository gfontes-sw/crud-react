import { useReducer } from 'react';
import ProductContext from "./ProductContext";

const defaultItemsState = {
    items: {},
    }

const itemReducer = (state, action) => {
if(action.type === 'ADD') {
    const updatedItems = state.items
    return{
        items = updatedItems
    }
}

return defaultItemsState;
}

const ItemsProvider = ({children}) => {

   const [itemState, dispatchItemAction] = useReducer(itemReducer, defaultItemsState);

    const addItemsHandler = (items) => {
 dispatchItemAction({type: 'ADD', item: items})
    }

    const removeItemsHandler = (id) => {
        dispatchItemAction({type: 'REMOVE', id: id})
    }

    const itemsContext = {
        items: itemState.items,
        addItems: addItemsHandler,
        removeItem: removeItemsHandler,
    }

    return (
        <ProductContext.Provider value={itemsContext}>{children}</ProductContext.Provider>
    )
}

export default ItemsProvider;