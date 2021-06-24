import * as actions from "../constants/ActionTypes";

const INIT_AUTH_DATA = {
    user: {},
    authLoading: false,
    authError: false,
};

const INIT_FORGOT_PASSWORD_DATA = {
    response: {},
    forgotPasswordLoading: false,
    forgotPasswordError: false,
};

export function AuthReducer(state = INIT_AUTH_DATA, action) {
    switch (action.type) {
        case actions.FETCHING_AUTH_DATA:
            return {
                ...state,
                authLoading: true
            };
        case actions.FETCH_AUTH_DATA_SUCCESS:
            return {
                ...state,
                user: action.payload,
                authLoading: false,
                authError: null,
            };
        case actions.AUTH_DATA_ERROR:
            return {
                ...state,
                authLoading: false,
                authError: action.error,
            };
        case actions.RESET_AUTH_DATA:
            return INIT_AUTH_DATA;

        default:
            return state;
    }
}

export function ForgotPasswordReducer(state = INIT_FORGOT_PASSWORD_DATA, action) {
    switch (action.type) {
        case actions.FETCHING_FORGOT_PASSWORD_DATA:
            return {
                ...state,
                forgotPasswordLoading: true
            };
        case actions.GET_FORGOT_PASSWORD_DATA_SUCCESS:
            return {
                ...state,
                response: action.payload,
                forgotPasswordLoading: false,
                forgotPasswordError: null,
            };
        case actions.FORGOT_PASSWORD_DATA_ERROR:
            return {
                ...state,
                forgotPasswordLoading: false,
                forgotPasswordError: action.error,
            };

        case actions.RESET_AUTH_DATA:
            return INIT_FORGOT_PASSWORD_DATA;
        default:
            return state;
    }
}