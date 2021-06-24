import { appId, restKey, serverUrl } from '../config';
export const AddressSaveAPI = async(addressData) => {
    console.log(addressData);
    try {
        const url = serverUrl + 'classes/AddressInfo';
        const body = {...addressData };
        const saveAddressData = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Parse-Application-Id': appId,
                'X-Parse-REST-API-Key': restKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return await saveAddressData.json();
    } catch (errors) {
        return errors;
    }
};

export const AddressUpdateAPI = async(addressData) => {
    console.log(addressData);
    try {
        const url = serverUrl + 'classes/AddressInfo/' + addressData.objectId;
        const body = {...addressData };
        const saveAddressData = await fetch(url, {
            method: 'PUT',
            headers: {
                'X-Parse-Application-Id': appId,
                'X-Parse-REST-API-Key': restKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return await saveAddressData.json();
    } catch (errors) {
        return errors;
    }
};

export const AddressDeleteAPI = async(objectId) => {
    try {
        const url = serverUrl + 'classes/AddressInfo/' + objectId;
        const deleteAddressData = await fetch(url, {
            method: 'DELETE',
            headers: {
                'X-Parse-Application-Id': appId,
                'X-Parse-REST-API-Key': restKey,
            }
        });
        return await deleteAddressData.json();
    } catch (errors) {
        return errors;
    }
};

export const FetchAddressAPI = async(userId) => {
    console.log(userId);
    try {
        const url = serverUrl + 'functions/getAddresses';
        const body = {
            userId
        };
        const addressData = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Parse-Application-Id': appId,
                'X-Parse-REST-API-Key': restKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return await addressData.json();
    } catch (errors) {
        return errors;
    }
};