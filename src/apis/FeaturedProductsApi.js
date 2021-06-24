import { serverUrl, headers } from '../config';
export const getFeaturedProductsApi = async () => {
  try {
    const url = serverUrl + 'functions/getProductsByType';
    const body = {
      type: 'featured',
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
