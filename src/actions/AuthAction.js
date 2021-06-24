import * as actions from "../constants/ActionTypes";

export function fetchingAuthData(payload) {
    return {
        type: actions.FETCHING_AUTH_DATA,
        payload
    };
}
export function resetAuthData() {
    return {
        type: actions.RESET_AUTH_DATA
    };
}

export function fetchAuthDataSuccess(user) {
    return {
        type: actions.FETCH_AUTH_DATA_SUCCESS,
        payload: user,
    };
}

export function authDataError(error) {
    return {
        type: actions.AUTH_DATA_ERROR,
        error
    };
}

export function fetchingForgotPasswordData(emailId) {
    return {
        type: actions.FETCHING_FORGOT_PASSWORD_DATA,
        emailId
    };
}

export function getForgotPasswordDataSuccess(forgotPassword) {
    return {
        type: actions.GET_FORGOT_PASSWORD_DATA_SUCCESS,
        payload: forgotPassword,
    };
}

export function forgotPasswordDataError(error) {
    return {
        type: actions.FORGOT_PASSWORD_DATA_ERROR,
        error
    };
}