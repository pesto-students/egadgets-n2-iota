import {
  GET_CATEGORY_DATA,
  GET_CATEGORY_DATA_SUCCESS,
  GET_CATEGORY_DATA_ERROR,
} from '../constants/ActionTypes';

export const getCategoryData = () => {
  return {
    type: GET_CATEGORY_DATA,
  };
};

export const getCategoryDataSuccess = (categories) => {
  return {
    type: GET_CATEGORY_DATA_SUCCESS,
    payload: categories,
  };
};

export const getCategoryDataError = (error) => {
  return {
    type: GET_CATEGORY_DATA_ERROR,
    payload: error,
  };
};
