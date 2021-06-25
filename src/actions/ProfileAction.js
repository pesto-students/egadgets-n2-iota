import * as actions from "../constants/ActionTypes";

export function savingProfileData(profileData, sessionToken) {
    return {
        type: actions.SAVING_PROFILE_DATA,
        profileData,
        sessionToken
    };
}

export function fetchSavedProfileDataSuccess(Profile) {
    return {
        type: actions.SAVE_PROFILEDATA_SUCCESS,
        payload: Profile,
    };
}

export function ProfileDataError(error) {
    return {
        type: actions.PROFILEDATA_ERROR,
        payload: error
    };
}



export function fetchingProfileData(userId) {
    return {
        type: actions.FETCHING_PROFILE_DATA,
        payload: userId,
    };
}

export function getProfileDataSuccess(Profile) {
    return {
        type: actions.GET_PROFILEDATA_SUCCESS,
        payload: Profile,
    };
}

export function getProfileDataError(error) {
    return {
        type: actions.GET_PROFILEDATA_ERROR,
        payload: error
    };
}