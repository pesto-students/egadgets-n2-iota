import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_FEATURED_PRODUCTS_DATA,
  GET_FEATURED_PRODUCTS_DATA_ERROR,
} from '../constants/ActionTypes';
import { getFeaturedProductsDataSuccess } from '../actions/FeaturedProductsAction';
import { getFeaturedProductsApi } from '../apis/FeaturedProductsApi';

function* fetchFeaturedProducts() {
  try {
    const response = yield call(getFeaturedProductsApi);
    yield put(getFeaturedProductsDataSuccess(response.result));
  } catch (e) {
    yield put({
      type: GET_FEATURED_PRODUCTS_DATA_ERROR,
      featuredDataError: e.message,
    });
  }
}

export default function* waitForFetchFeaturedProducts() {
  yield takeEvery(GET_FEATURED_PRODUCTS_DATA, fetchFeaturedProducts);
}
