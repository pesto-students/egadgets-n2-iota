import {
  GET_NUMBER_CART,
  ADD_CART,
  DELETE_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_CART,
} from '../constants/ActionTypes';

const INIT_CART_DATA = {
  numberCart: 0,
  Carts: [],
};

const CartReducer = (state = INIT_CART_DATA, action) => {
  switch (action.type) {
    case GET_NUMBER_CART:
      return {
        ...state,
      };
    case ADD_CART:
      if (state.numberCart === 0) {
        let cart = {
          id: action.payload.id,
          quantity: action.payload.quantity ? action.payload.quantity : 1,
          name: action.payload.productName,
          description: action.payload.description,
          image: action.payload.image,
          price: action.payload.price,
        };
        state.Carts.push(cart);
      } else {
        let check = false;
        state.Carts.map((item, key) => {
          if (item.id === action.payload.id) {
            state.Carts[key].quantity++;
            check = true;
          }
        });
        if (!check) {
          let _cart = {
            id: action.payload.id,
            quantity: action.payload.quantity ? action.payload.quantity : 1,
            name: action.payload.productName,
            description: action.payload.description,
            image: action.payload.image,
            price: action.payload.price,
          };
          state.Carts.push(_cart);
        }
      }
      return {
        ...state,
        numberCart: state.numberCart + 1,
      };
    case INCREASE_QUANTITY:
      state.numberCart++;
      state.Carts[action.payload].quantity++;

      return {
        ...state,
      };
    case DECREASE_QUANTITY:
      let quantity = state.Carts[action.payload].quantity;
      if (quantity > 1) {
        state.numberCart--;
        state.Carts[action.payload].quantity--;
      }

      return {
        ...state,
      };
    case DELETE_CART:
      return {
        ...state,
        numberCart: state.Carts.length - 1,
        Carts: state.Carts.filter((item) => {
          return item.id !== state.Carts[action.payload].id;
        }),
      };

    case CLEAR_CART:
      return {
        ...state,
        numberCart: 0,
        Carts: [],
      };

    default:
      return state;
  }
};

export default CartReducer;
