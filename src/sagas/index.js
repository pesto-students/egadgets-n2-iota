import { all } from '@redux-saga/core/effects';

import waitForFetchCategories from '../sagas/CategorySaga';
import AddressSaga from './AddressSaga';
import waitForFetchCategoryProducts from './CategoryProductsSaga';
import waitForFetchFeaturedProducts from './FeaturedProductsSaga';
import waitForFetchNewProducts from './NewProductsSaga';
import OrdersHistorySaga from './OrderHistorySaga';
import ProductDetailsSaga from './ProductDetailsSaga';
import ProfileSaga from './ProfileSaga';
import SignInSaga from './SignInSaga';

export default function* rootSaga() {
    yield all([
        waitForFetchCategories(),
        waitForFetchNewProducts(),
        waitForFetchFeaturedProducts(),
        waitForFetchCategoryProducts(),
        ProductDetailsSaga(),
        ProfileSaga(),
        OrdersHistorySaga(),
        SignInSaga(),
        AddressSaga()
    ]);
}