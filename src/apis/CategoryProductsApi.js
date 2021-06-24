import { serverUrl, headers } from '../config';
export const getCategoryProductsApi = async (categoryId) => {
  try {
    const url = serverUrl + 'functions/getProductsByCategory';
    const body = {
      categoryId,
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
