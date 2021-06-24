import { appId, restKey, serverUrl } from '../config';
export const getProductDataByIdApi = async (productId) => {
  try {
    const url = serverUrl + 'functions/getProductById';
    const body = {
      productId,
    };
    const productDetailDataResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Parse-Application-Id': appId,
        'X-Parse-REST-API-Key': restKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await productDetailDataResponse.json();
  } catch (errors) {
    return errors;
  }
};

export default getProductDataByIdApi;
