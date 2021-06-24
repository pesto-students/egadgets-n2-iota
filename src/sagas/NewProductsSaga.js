import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_NEW_PRODUCTS_DATA,
  GET_NEW_PRODUCTS_DATA_ERROR,
} from '../constants/ActionTypes';
import { getNewProductsDataSuccess } from '../actions/NewProductsAction';
import { getNewProductsApi } from '../apis/NewProductsApi';

function* fetchNewProducts() {
  try {
    const response = yield call(getNewProductsApi);
    yield put(getNewProductsDataSuccess(response.result));
  } catch (e) {
    yield put({
      type: GET_NEW_PRODUCTS_DATA_ERROR,
      newDataError: e.message,
    });
  }
}

export default function* waitForFetchNewProducts() {
  yield takeEvery(GET_NEW_PRODUCTS_DATA, fetchNewProducts);
}
