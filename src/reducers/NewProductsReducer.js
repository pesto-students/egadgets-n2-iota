import {
  GET_NEW_PRODUCTS_DATA,
  GET_NEW_PRODUCTS_DATA_SUCCESS,
  GET_NEW_PRODUCTS_DATA_ERROR,
} from '../constants/ActionTypes';

const INIT_NEW_PRODUCTS_DATA = {
  newProductsDataLoader: false,
  newProductsData: [],
  newProductsDataError: null,
};

const NewProductsReducer = (state = INIT_NEW_PRODUCTS_DATA, action) => {
  switch (action.type) {
    case GET_NEW_PRODUCTS_DATA: {
      return {
        ...state,
        newProductsDataLoader: true,
      };
    }
    case GET_NEW_PRODUCTS_DATA_SUCCESS: {
      return {
        ...state,
        newProductsData: action.payload,
        newProductsDataLoader: false,
        newProductsDataError: null,
      };
    }
    case GET_NEW_PRODUCTS_DATA_ERROR: {
      return {
        ...state,
        newProductsDataError: action.payload,
        newProductsDataLoader: false,
      };
    }
    default:
      return state;
  }
};

export default NewProductsReducer;
