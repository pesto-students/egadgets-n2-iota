const serverUrl = 'https://iota.b4a.io/';
const appId = 'NZK11KBs4bC0ErXQN01qEKU3a3WVWgnr6EM0Syoc';
const restKey = 'pVDT4kF8JhQvA7iYffZOv9hKzC1mCBVKwbZQPlpz';
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
