import {
  GET_CATEGORY_DATA,
  GET_CATEGORY_DATA_SUCCESS,
  GET_CATEGORY_DATA_ERROR,
} from '../constants/ActionTypes';

const INIT_CATEGORY_DATA = {
  categoryDataLoader: false,
  categoryData: [],
  categoryDataError: null,
};

const CategoryReducer = (state = INIT_CATEGORY_DATA, action) => {
  switch (action.type) {
    case GET_CATEGORY_DATA: {
      return {
        ...state,
        categoryDataLoader: true,
      };
    }
    case GET_CATEGORY_DATA_SUCCESS: {
      return {
        ...state,
        categoryData: action.payload,
        categoryDataLoader: false,
        categoryDataError: null,
      };
    }
    case GET_CATEGORY_DATA_ERROR: {
      return {
        ...state,
        categoryDataError: action.payload,
        categoryDataLoader: false,
      };
    }
    default:
      return state;
  }
};

export default CategoryReducer;
