import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/common/Footer';
import Shop from './pages/Shop';
import NotFound from './pages/NotFound';
import Category from './components/Category';
import ProductDetails from './pages/ProductDetails';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile/Profile';
import Cart from './pages/Cart';
import Checkout from './components/CheckOut';
import TopHeader from './components/common/header/TopHeader';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { NotificationContainer } from 'react-notifications';
import { useDispatch } from 'react-redux';
import { getCategoryData } from './actions/CategoryAction';
import { getNewProductsData } from './actions/NewProductsAction';
import { getFeaturedProductsData } from './actions/FeaturedProductsAction';
import AddressManage from './pages/AddressManage';
import OrderSuccess from './pages/OrderSuccess';
import RefundAndExchangePolicy from './pages/RefundAndExchangePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndCondition from './pages/TermsAndCondition';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCategoryData());
    dispatch(getNewProductsData());
    dispatch(getFeaturedProductsData());
  }, [dispatch]);

  return (
    <>
      <Router>
        <TopHeader />
        <main style={{ marginTop: '66px' }} className="main-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <div style={{ marginTop: '100px' }}>
              <Route path="/shop/:id?" component={Shop} />
              <Route path="/categories" component={Category} />
              <Route path="/cart" component={Cart} />
              <Route path="/profile" component={Profile} />
              <Route path="/products/:id" component={ProductDetails} />
              <Route path="/orders" component={OrderHistory} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/payment/callback" component={Category} />
              <Route path="/address" component={AddressManage} />
              <Route path="/order-success" component={OrderSuccess} />
              <Route
                path="/refund-and-exchange-policy"
                component={RefundAndExchangePolicy}
              />
              <Route path="/privacy-policy" component={PrivacyPolicy} />
              <Route
                path="/terms-and-condition"
                component={TermsAndCondition}
              />
            </div>
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </Router>
      <NotificationContainer />
    </>
  );
};

export default App;
