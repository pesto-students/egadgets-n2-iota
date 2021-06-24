import * as actions from '../constants/ActionTypes';

export function fetchingOrdersData(userId) {
  return {
    type: actions.FETCHING_ORDER_HISTORY_DATA,
    payload: userId,
  };
}

export function fetchOrdersDataSuccess(Orders) {
  return {
    type: actions.FETCH_ORDER_HISTORY_DATA_SUCCESS,
    payload: Orders,
  };
}

export function OrdersDataError(error) {
  return {
    type: actions.ORDER_HISTORY_DATA_ERROR,
    payload: error,
  };
}

// Add order

export function addNewOrder(payload) {
  return {
    type: actions.ADD_NEW_ORDER,
    payload: payload,
  };
}
