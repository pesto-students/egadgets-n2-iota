import { headers } from '../config';
export const CreateOrderApi = async (data) => {
  try {
    const url = 'https://iota.b4a.io/classes/Orders';
    const params = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    };
    console.log('createorderapi', params);
    const response = await fetch(url, params);
    return await response.json();
  } catch (errors) {
    return errors;
  }
};

export default CreateOrderApi;
