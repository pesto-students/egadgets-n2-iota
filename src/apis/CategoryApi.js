import { appId, restKey, serverUrl } from '../config';

export const getCategoryDataApi = async () => {
  try {
    const url = serverUrl + 'functions/getCategoriesApi';
    const body = {};
    const categoryDataResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Parse-Application-Id': appId,
        'X-Parse-REST-API-Key': restKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await categoryDataResponse.json();
  } catch (errors) {
    return errors;
  }
};
