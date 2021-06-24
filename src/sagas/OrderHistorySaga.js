import * as actionTypes from '../constants/ActionTypes';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchOrdersDataSuccess,
  OrdersDataError,
} from '../actions/OrdersHistoryAction';
import { OrdersHistoryAPI } from '../apis/OrdersHistoryAPI';

function* OrderHistory(action) {
  try {
    const orderHistory = yield call(OrdersHistoryAPI, action.payload);
    console.log(orderHistory);
    if (orderHistory.code) {
      if (orderHistory.code === 401) {
        // logout the user
      } else {
        yield put(OrdersDataError(orderHistory));
      }
    } else {
      yield put(fetchOrdersDataSuccess(orderHistory.result));
    }
  } catch (e) {
    console.log(e);
    yield put(OrdersDataError(e));
  }
}

export default function* OrdersHistorySaga() {
  yield takeEvery(actionTypes.FETCHING_ORDER_HISTORY_DATA, OrderHistory);
}
