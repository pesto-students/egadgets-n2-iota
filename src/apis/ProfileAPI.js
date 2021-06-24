import { appId, restKey, serverUrl } from '../config';
export const SaveProfileAPI = async(profileData, sessionToken) => {
    console.log(profileData);
    try {
        const url = serverUrl + 'users/' + profileData.objectId;
        const body = {
            ...profileData
        };
        const savedProfileDataResponse = await fetch(url, {
            method: 'PUT',
            headers: {
                'X-Parse-Application-Id': appId,
                'X-Parse-REST-API-Key': restKey,
                'X-Parse-Session-Token': sessionToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return await savedProfileDataResponse.json();
    } catch (errors) {
        return errors;
    }
};

export const GetProfileAPI = async(payload) => {
    console.log(payload);
    try {
        const url = serverUrl + 'functions/getProfileData';
        const body = {
            userId: payload.userId
        };
        const profileDataResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Parse-Application-Id': appId,
                'X-Parse-REST-API-Key': restKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return await profileDataResponse.json();
    } catch (errors) {
        return errors;
    }
};