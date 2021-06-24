import * as actionTypes from '../constants/ActionTypes';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as profileAction from '../actions/ProfileAction';
import { SaveProfileAPI } from '../apis/ProfileAPI';

function* SaveProfileDetails(action) {
    try {
        console.log(action);
        const profile = yield call(SaveProfileAPI, action.profileData, action.sessionToken);

        if (profile.code) {
            if (profile.code === 401) {
                // logout the user
            } else {
                yield put(profileAction.ProfileDataError(profile));
            }
        } else {
            yield put(profileAction.fetchSavedProfileDataSuccess(profile));
        }

    } catch (e) {
        console.log(e);
        yield put(profileAction.ProfileDataError(e));
    }
}


export default function* ProfileSaga() {
    yield takeEvery(actionTypes.SAVING_PROFILE_DATA, SaveProfileDetails);
}