import * as actions from '../constants/ActionTypes';
const initialState = {
  orderHistory: [],
  orderHistoryLoading: false,
  orderHistoryError: null,
};

export default function OrderHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCHING_ORDER_HISTORY_DATA: {
      return {
        ...state,
        orderHistoryLoading: true,
      };
    }
    case actions.FETCH_ORDER_HISTORY_DATA_SUCCESS: {
      return {
        ...state,
        orderHistory: action.payload,
        orderHistoryLoading: false,
        orderHistoryError: null,
      };
    }
    case actions.ORDER_HISTORY_DATA_ERROR: {
      return {
        ...state,
        orderHistoryLoading: false,
        orderHistoryError: action.payload,
      };
    }
    case actions.ADD_NEW_ORDER: {
      return {
        ...state,
        orderHistory: action.payload,
        orderHistoryLoading: false,
        orderHistoryError: null,
      };
    }
    default:
      return state;
  }
}
