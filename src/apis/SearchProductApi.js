import { serverUrl, headers } from '../config';
export const searchProductApi = async (keyword) => {
  try {
    const url = serverUrl + 'functions/searchProducts';
    const body = {
      keyword,
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (errors) {
    return errors;
  }
};
