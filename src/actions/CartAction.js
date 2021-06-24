import {
  GET_NUMBER_CART,
  ADD_CART,
  UPDATE_CART,
  DELETE_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_CART,
} from '../constants/ActionTypes';

export function GetNumberCart() {
  return {
    type: GET_NUMBER_CART,
  };
}

export function AddCart(payload) {
  return {
    type: ADD_CART,
    payload,
  };
}
export function UpdateCart(payload) {
  return {
    type: UPDATE_CART,
    payload,
  };
}
export function DeleteCart(payload) {
  return {
    type: DELETE_CART,
    payload,
  };
}

export function IncreaseQuantity(payload) {
  return {
    type: INCREASE_QUANTITY,
    payload,
  };
}
export function DecreaseQuantity(payload) {
  return {
    type: DECREASE_QUANTITY,
    payload,
  };
}

export function ClearCart() {
  return {
    type: CLEAR_CART,
  };
}
