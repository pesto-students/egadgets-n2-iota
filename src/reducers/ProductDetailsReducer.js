import * as actions from "../constants/ActionTypes";

const INIT_PRODUCT_DETAILS_DATA = {
    product: {},
    productLoading: false,
    productError: false,
};

export default function ProductDetailsReducer(state = INIT_PRODUCT_DETAILS_DATA, action) {
    switch (action.type) {
        case actions.FETCHING_PRODUCT_DATA:
            return {
                ...state,
                product: {},
                productLoading: true,
            };
        case actions.FETCH_PRODUCTDATA_SUCCESS:
            return {
                ...state,
                product: action.payload,
                productLoading: false,
                productError: null,
            };
        case actions.PRODUCTDATA_ERROR:
            return {
                ...state,
                productLoading: false,
                productError: action.payload,
            };

        default:
            return state;
    }
}