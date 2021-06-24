import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_CATEGORY_DATA,
  GET_CATEGORY_DATA_ERROR,
} from '../constants/ActionTypes';
import { getCategoryDataSuccess } from '../actions/CategoryAction';
import { getCategoryDataApi } from '../apis/CategoryApi';

function* fetchCategories() {
  try {
    const response = yield call(getCategoryDataApi);
    yield put(getCategoryDataSuccess(response.result));
  } catch (e) {
    yield put({ type: GET_CATEGORY_DATA_ERROR, categoryDataError: e.message });
  }
}

export default function* waitForFetchCategories() {
  yield takeEvery(GET_CATEGORY_DATA, fetchCategories);
}
