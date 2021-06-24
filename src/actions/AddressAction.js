import * as actions from "../constants/ActionTypes";

export function savingAddressData(addressData) {
    console.log(addressData);
    return {
        type: actions.SAVING_ADDRESS_DATA,
        payload: addressData
    };
}

export function fetchSaveAddressDataSuccess(addressData) {
    return {
        type: actions.SAVE_ADDRESS_DATA_SUCCESS,
        payload: addressData
    };
}

export function saveAddressDataError(error) {
    return {
        type: actions.SAVE_ADDRESS_DATA_ERROR,
        error
    };
}

// delete address api

export function deletingAddressData(objectId) {
    return {
        type: actions.DELETING_ADDRESS_DATA,
        payload: objectId
    };
}

export function getDeleteAddressDataSuccess(address) {
    return {
        type: actions.GET_DELETE_ADRESS_DATA_SUCCESS,
        payload: address
    };
}

export function deleteAddressDataError(error) {
    return {
        type: actions.DELETE_ADDRESS_DATA_ERROR,
        error
    };
}


export function fetchingAddressData(userId) {
    return {
        type: actions.FETCHING_ADDRESS_DATA,
        userId
    };
}

export function fetchAddressDataSuccess(address) {
    return {
        type: actions.FETCH_ADRESS_DATA_SUCCESS,
        payload: address
    };
}

export function addressDataError(error) {
    return {
        type: actions.ADDRESS_DATA_ERROR,
        error
    };
}