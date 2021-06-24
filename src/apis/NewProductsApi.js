import { serverUrl, headers } from '../config';
export const getNewProductsApi = async () => {
  try {
    const url = serverUrl + 'functions/getProductsByType';
    const body = {
      type: 'new',
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
