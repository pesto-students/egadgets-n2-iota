import {
  GET_FEATURED_PRODUCTS_DATA,
  GET_FEATURED_PRODUCTS_DATA_SUCCESS,
  GET_FEATURED_PRODUCTS_DATA_ERROR,
} from '../constants/ActionTypes';

const INIT_FEATURED_PRODUCTS_DATA = {
  featuredProductsDataLoader: false,
  featuredProductsData: [],
  featuredProductsDataError: null,
};

const FeaturedProductsReducer = (
  state = INIT_FEATURED_PRODUCTS_DATA,
  action
) => {
  switch (action.type) {
    case GET_FEATURED_PRODUCTS_DATA: {
      return {
        ...state,
        featuredProductsDataLoader: true,
      };
    }
    case GET_FEATURED_PRODUCTS_DATA_SUCCESS: {
      return {
        ...state,
        featuredProductsData: action.payload,
        featuredProductsDataLoader: false,
        featuredProductsDataError: null,
      };
    }
    case GET_FEATURED_PRODUCTS_DATA_ERROR: {
      return {
        ...state,
        featuredProductsDataError: action.payload,
        featuredProductsDataLoader: false,
      };
    }
    default:
      return state;
  }
};

export default FeaturedProductsReducer;
