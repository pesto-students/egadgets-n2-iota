import * as actions from "../constants/ActionTypes";

const INIT_ADDRESS_DATA = {
    address: {},
    addressLoading: false,
    addressError: false,
    saveAddress: {},
    saveAddressLoading: false,
    saveAddressError: false,
    deleteAddress: {},
    deleteAddressLoading: false,
    deleteAddressError: false,
};

export function AddressReducer(state = INIT_ADDRESS_DATA, action) {
    switch (action.type) {
        case actions.FETCHING_ADDRESS_DATA:
            return {
                ...state,
                addressLoading: true,
            };
        case actions.FETCH_ADRESS_DATA_SUCCESS:
            return {
                ...state,
                address: action.payload,
                addressLoading: false,
                addressError: null,
            };
        case actions.ADDRESS_DATA_ERROR:
            return {
                ...state,
                addressLoading: false,
                addressError: action.payload,
            };

        case actions.SAVING_ADDRESS_DATA:
            return {
                ...state,
                saveAddressLoading: true,
            };
        case actions.SAVE_ADDRESS_DATA_SUCCESS:
            return {
                ...state,
                saveAddress: action.payload,
                saveAddressLoading: false,
                saveAddressError: null,
            };
        case actions.SAVE_ADDRESS_DATA_ERROR:
            return {
                ...state,
                saveAddressLoading: false,
                saveAddressError: action.payload,
            };


        case actions.DELETING_ADDRESS_DATA:
            return {
                ...state,
                deleteAddressLoading: true,
            };
        case actions.GET_DELETE_ADRESS_DATA_SUCCESS:
            return {
                ...state,
                deleteAddress: action.payload,
                deleteAddressLoading: false,
                deleteAddressError: null,
            };
        case actions.DELETE_ADDRESS_DATA_ERROR:
            return {
                ...state,
                deleteAddressLoading: false,
                deleteAddressError: action.payload,
            };
        case actions.RESET_AUTH_DATA:
            return INIT_ADDRESS_DATA;

        default:
            return state;
    }
}