import * as actions from "../constants/ActionTypes";

export function fetchingProductData(productId) {
    return {
        type: actions.FETCHING_PRODUCT_DATA,
        productId,
    };
}

export function fetchProductDataSuccess(product) {
    return {
        type: actions.FETCH_PRODUCTDATA_SUCCESS,
        payload: product['result'][0],
    };
}

export function productDataError(error) {
    return {
        type: actions.PRODUCTDATA_ERROR,
        payload: error
    };
}