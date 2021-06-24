import * as actions from '../constants/ActionTypes';

const INIT_SAVE_DATA = {
    profile: {},
    profileLoading: false,
    profileError: false,
};

export function SaveProfileReducer(state = INIT_SAVE_DATA, action) {
    switch (action.type) {
        case actions.SAVING_PROFILE_DATA:
            return {
                ...state,
                profileLoading: true,
            };
        case actions.SAVE_PROFILEDATA_SUCCESS:
            return {
                ...state,
                profile: action.payload,
                profileLoading: false,
                profileError: null,
            };
        case actions.PROFILEDATA_ERROR:
            return {
                ...state,
                profileLoading: false,
                profileError: action.payload,
            };
        case actions.RESET_AUTH_DATA:
            return INIT_SAVE_DATA;
        default:
            return state;
    }
}