import * as actionTypes from '../constants/ActionTypes';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as addressAction from '../actions/AddressAction';
import {
    AddressDeleteAPI,
    AddressSaveAPI,
    AddressUpdateAPI,
    FetchAddressAPI,
} from '../apis/AddressAPI';

function* AddressData(action) {
    try {
        console.log(action);
        const address = yield call(
            action.payload.objectId ? AddressUpdateAPI : AddressSaveAPI,
            action.payload
        );
        if (address.code) {
            if (address.code === 401) {
                // logout the user
            } else {
                yield put(addressAction.saveAddressDataError(address));
            }
        } else {
            yield put(addressAction.fetchSaveAddressDataSuccess(address));
        }

    } catch (e) {
        console.log(e);
        yield put(addressAction.saveAddressDataError(e));
    }
}

function* GetAddressData(action) {
    try {
        const address = yield call(FetchAddressAPI, action.userId);
        if (address.code) {
            if (address.code === 401) {
                // logout the user
            } else {
                yield put(addressAction.addressDataError(address));
            }
        } else {
            yield put(addressAction.fetchAddressDataSuccess(address));
        }

    } catch (e) {
        console.log(e);
        yield put(addressAction.addressDataError(e));
    }
}

function* deleteAddress(action) {
    try {
        const address = yield call(AddressDeleteAPI, action.payload);
        if (address.code) {
            if (address.code === 401) {
                // logout the user
            } else {
                yield put(addressAction.deleteAddressDataError(address));
            }
        } else {
            yield put(addressAction.getDeleteAddressDataSuccess(address));
        }
    } catch (e) {
        console.log(e);
        yield put(addressAction.deleteAddressDataError(e));
    }
}

export default function* AddressSaga() {
    yield takeEvery(actionTypes.SAVING_ADDRESS_DATA, AddressData);
    yield takeEvery(actionTypes.DELETING_ADDRESS_DATA, deleteAddress);
    yield takeEvery(actionTypes.FETCHING_ADDRESS_DATA, GetAddressData);
}