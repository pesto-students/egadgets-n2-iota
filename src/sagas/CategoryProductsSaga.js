import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_CATEGORY_PRODUCTS_DATA,
  GET_CATEGORY_PRODUCTS_DATA_ERROR,
} from '../constants/ActionTypes';
import { getCategoryProductsDataSuccess } from '../actions/CategoryProductsAction';
import { getCategoryProductsApi } from '../apis/CategoryProductsApi';

function* fetchCategoryProducts(action) {
  try {
    const response = yield call(getCategoryProductsApi, action.categoryId);
    yield put(getCategoryProductsDataSuccess(response.result));
  } catch (e) {
    yield put({
      type: GET_CATEGORY_PRODUCTS_DATA_ERROR,
      categoryProductsDataError: e.message,
    });
  }
}

export default function* waitForFetchCategoryProducts() {
  yield takeEvery(GET_CATEGORY_PRODUCTS_DATA, fetchCategoryProducts);
}
