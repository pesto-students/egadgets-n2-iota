import { combineReducers } from 'redux';
import CategoryReducer from './CategoryReducer';
import CartReducer from './CartReducer';
import ProductDetailsReducer from './ProductDetailsReducer';
import { AuthReducer, ForgotPasswordReducer } from './AuthReducer';
import OrderHistoryReducer from './OrdersHistoryReducer';
import NewProductsReducer from './NewProductsReducer';
import FeaturedProductsReducer from './FeaturedProductsReducer';
import CategoryProductsReducer from './CategoryProductsReducer';
import { SaveProfileReducer } from './ProfileReducer';
import { AddressReducer } from './AddressReducer';
// eslint-disable-next-line
const ShopApp = combineReducers({
  categories: CategoryReducer,
  auth: AuthReducer,
  orderHistoryDetails: OrderHistoryReducer,
  newProducts: NewProductsReducer,
  featuredProducts: FeaturedProductsReducer,
  cateogryProducts: CategoryProductsReducer,
  carts: CartReducer,
  productDetails: ProductDetailsReducer,
  profile: SaveProfileReducer,
  address: AddressReducer,
  forgotPassword: ForgotPasswordReducer,
});

export default ShopApp;
