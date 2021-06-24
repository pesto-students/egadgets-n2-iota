import {
  GET_NEW_PRODUCTS_DATA,
  GET_NEW_PRODUCTS_DATA_SUCCESS,
  GET_NEW_PRODUCTS_DATA_ERROR,
} from '../constants/ActionTypes';

export const getNewProductsData = () => {
  return {
    type: GET_NEW_PRODUCTS_DATA,
  };
};

export const getNewProductsDataSuccess = (newProducts) => {
  return {
    type: GET_NEW_PRODUCTS_DATA_SUCCESS,
    payload: newProducts,
  };
};

export const getNewProductsDataError = (error) => {
  return {
    type: GET_NEW_PRODUCTS_DATA_ERROR,
    payload: error,
  };
};
