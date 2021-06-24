import * as actionTypes from "../constants/ActionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import * as authAction from "../actions/AuthAction";
import { ForgotPasswordAPI, SignInAPI, SignUpAPI, userMeApi } from "../apis/AuthAPI";

function* Auth(action) {
    try {
        const user = yield call(action.payload.apiType === 'signIn' ? SignInAPI : (action.payload.apiType === 'signUp' ? SignUpAPI : userMeApi), action.payload);

        if (user.code) {
            if (user.code === 401) {
                // logout the user
            } else {
                yield put(authAction.authDataError(user));
            }
        } else {
            yield put(authAction.fetchAuthDataSuccess(user));
        }
    } catch (e) {
        yield put(authAction.authDataError(e));
    }
}

function* ForgotPassword(action) {
    try {
        const forgotPassword = yield call(ForgotPasswordAPI, action.emailId);

        if (forgotPassword.code) {
            if (forgotPassword.code === 401) {
                // logout the user
            } else {
                yield put(authAction.getForgotPasswordDataSuccess(forgotPassword));
            }
        } else {
            yield put(authAction.forgotPasswordDataError(forgotPassword));
        }
    } catch (e) {
        yield put(authAction.forgotPasswordDataError(e));
    }
}

export default function* SignInSaga() {
    yield takeEvery(actionTypes.FETCHING_AUTH_DATA, Auth);
    yield takeEvery(actionTypes.FETCHING_FORGOT_PASSWORD_DATA, ForgotPassword);
}