import * as actionTypes from '../constants/ActionTypes';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as productDetailsAction from '../actions/ProductDetailsAction';
import getProductDataByIdApi from '../apis/ProductDetailsAPI';

function* ProductDetails(action) {
    try {
        const product = yield call(getProductDataByIdApi, action.productId);
        if (product.code) {
            if (product.code === 401) {
                // logout the user
            } else {
                yield put(productDetailsAction.productDataError(product));
            }
        } else {
            yield put(productDetailsAction.fetchProductDataSuccess(product));;
        }
    } catch (e) {
        yield put(productDetailsAction.productDataError(e));
    }
}

export default function* ProductDetailsSaga() {
    yield takeEvery(actionTypes.FETCHING_PRODUCT_DATA, ProductDetails);
}