import { serverUrl, headers } from '../config';
export const OrdersHistoryAPI = async (payload) => {
  try {
    const url = serverUrl + 'functions/getOrdersByUserId';
    const body = { userId: payload.userId };
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

export default OrdersHistoryAPI;
