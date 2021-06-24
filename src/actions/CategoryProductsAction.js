import {
  GET_CATEGORY_PRODUCTS_DATA,
  GET_CATEGORY_PRODUCTS_DATA_SUCCESS,
  GET_CATEGORY_PRODUCTS_DATA_ERROR,
} from '../constants/ActionTypes';

export const getCategoryProductsData = (categoryId) => {
  return {
    type: GET_CATEGORY_PRODUCTS_DATA,
    categoryId,
  };
};

export const getCategoryProductsDataSuccess = (products) => {
  return {
    type: GET_CATEGORY_PRODUCTS_DATA_SUCCESS,
    payload: products,
  };
};

export const getCategoryProductsDataError = (error) => {
  return {
    type: GET_CATEGORY_PRODUCTS_DATA_ERROR,
    payload: error,
  };
};
