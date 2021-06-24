import {
  GET_CATEGORY_PRODUCTS_DATA,
  GET_CATEGORY_PRODUCTS_DATA_SUCCESS,
  GET_CATEGORY_PRODUCTS_DATA_ERROR,
} from '../constants/ActionTypes';

const INIT_CATEGORY_PRODUCTS_DATA = {
  categoryProductsDataLoader: false,
  categoryProductsData: [],
  categoryProductsDataError: null,
};

const CategoryProductsReducer = (
  state = INIT_CATEGORY_PRODUCTS_DATA,
  action
) => {
  switch (action.type) {
    case GET_CATEGORY_PRODUCTS_DATA: {
      return {
        ...state,
        categoryProductsDataLoader: true,
      };
    }
    case GET_CATEGORY_PRODUCTS_DATA_SUCCESS: {
      return {
        ...state,
        categoryProductsData: action.payload,
        categoryProductsDataLoader: false,
        categoryProductsDataError: null,
      };
    }
    case GET_CATEGORY_PRODUCTS_DATA_ERROR: {
      return {
        ...state,
        categoryProductsDataError: action.payload,
        categoryProductsDataLoader: false,
      };
    }
    default:
      return state;
  }
};

export default CategoryProductsReducer;
