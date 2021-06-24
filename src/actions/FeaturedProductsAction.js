import {
  GET_FEATURED_PRODUCTS_DATA,
  GET_FEATURED_PRODUCTS_DATA_SUCCESS,
  GET_FEATURED_PRODUCTS_DATA_ERROR,
} from '../constants/ActionTypes';

export const getFeaturedProductsData = () => {
  return {
    type: GET_FEATURED_PRODUCTS_DATA,
  };
};

export const getFeaturedProductsDataSuccess = (featuredProducts) => {
  return {
    type: GET_FEATURED_PRODUCTS_DATA_SUCCESS,
    payload: featuredProducts,
  };
};

export const getFeaturedProductsDataError = (error) => {
  return {
    type: GET_FEATURED_PRODUCTS_DATA_ERROR,
    payload: error,
  };
};
