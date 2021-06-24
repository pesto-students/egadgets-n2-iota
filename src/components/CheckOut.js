import React, { Component } from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import '../styles/pages/Checkout.css';
import CartItemList from './cart/CartItemList';
import CartSummary from './cart/CartSummary';
import { razorPayKey } from '../config';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { fetchingAuthData } from '../actions/AuthAction';
import { fetchingAddressData } from '../actions/AddressAction';
import SingleAddress from './common/SingleAddress';
import CreateOrderApi from '../apis/CreateOrderApi';
import { ClearCart } from '../actions/CartAction';
import { NotificationManager } from 'react-notifications';

class Checkout extends Component {
  state = {
    selectedValue: '',
    open: false,
    addressData: [],
    selectedShippingAddress: {},
  };

  componentDidMount() {
    const cookies = new Cookies();
    const sessionToken = cookies.get('sessionToken');
    if (sessionToken === null || sessionToken === undefined) {
      this.props.history.push('/signin');
    } else if (sessionToken && Object.keys(this.props.authData).length === 0) {
      this.props.dispatch(
        fetchingAuthData({
          apiType: 'userMe',
          sessionToken,
        })
      );
    } else if (sessionToken && Object.keys(this.props.authData).length > 0) {
      this.props.dispatch(fetchingAddressData(this.props.authData.objectId));
    }

    if (!this.props.totalItems) {
      this.props.history.push('/cart');
    }
  }

  componentDidUpdate(prevChange) {
    if (
      prevChange.authLoading === true &&
      this.props.authLoading === false &&
      this.props.authError === null
    ) {
      this.props.dispatch(fetchingAddressData(this.props.authData.objectId));
    } else if (
      prevChange.authLoading === true &&
      this.props.authLoading === false &&
      this.props.authError
    ) {
      NotificationManager.error(
        this.props.authError.error
          ? this.props.authError.error
          : 'Problem in getting user session data',
        'Error',
        this.props.authError.code ? this.props.authError.code : 101
      );
      this.props.history.push('/signin');
    }

    if (
      prevChange.addressDataLoading === true &&
      this.props.addressDataLoading === false &&
      this.props.addressError === null
    ) {
      if (this.props.addressData && this.props.addressData.length > 0) {
        this.setState({
          ...this.state,
          addressData: this.props.addressData,
          selectedShippingAddress: this.props.addressData[0],
        });
      }
    } else if (
      prevChange.addressDataLoading === true &&
      this.props.addressDataLoading === false &&
      this.props.addressError
    ) {
      NotificationManager.error(
        this.props.addressError.error
          ? this.props.addressError.error
          : 'Problem in getting Address data',
        'Error',
        this.props.addressError.code ? this.props.addressError.code : 101
      );
    }

    if (
      prevChange.saveAddressLoading === true &&
      this.props.saveAddressLoading === false &&
      this.props.addressError === null
    ) {
      if (this.props.saveAddress) {
        NotificationManager.success(
          'Address saved successfully',
          'Success',
          200
        );
      }
    } else if (
      prevChange.saveAddressLoading === true &&
      this.props.saveAddressLoading === false &&
      this.props.addressError
    ) {
      NotificationManager.error(
        this.props.addressError.error
          ? this.props.addressError.error
          : 'Problem in saving Address',
        'Error',
        this.props.addressError.code ? this.props.addressError.code : 101
      );
    }
  }

  render() {
    const handleChangeAddress = (address) => {
      this.setState({ selectedShippingAddress: address });
    };

    const calculateTotal = () => {
      let totalPrice = 0;
      if (this.props.items) {
        this.props.items.map(
          (item) => (totalPrice += item.quantity * item.price)
        );
      }
      return totalPrice;
    };
    const updateAddress = (address, savedAddress) => {
      if (savedAddress.id) {
        let updated = JSON.parse(JSON.stringify(this.state.addressData));
        updated = updated.filter(
          (ele) => !(ele.id && ele.id === savedAddress.id)
        );
        updated.push(savedAddress);
        this.setState({ ...this.state, addressData: updated });
      }
    };

    // Razor pay code

    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    const displayRazorpay = async () => {
      if (calculateTotal() <= 0) {
        alert('The amount must be greater than zero');
      }

      const products = this.props.items;
      const props$ = this.props;
      const userData$ = this.props.authData;
      const address = this.state.selectedShippingAddress;

      if (address == null) {
        alert('please choose the delivery address');
        return;
      }

      if (userData$ === null || userData$ === undefined) {
        this.props.history.push('/signin');
      }

      const options = {
        key: razorPayKey, // Enter the Key ID generated from the Dashboard
        amount: calculateTotal() * 100,
        currency: 'INR',
        name: 'EGadgets',
        description: 'Test Transaction',
        image: null,
        prefill: {
          name: userData$?.fullName,
          email: userData$?.email,
        },
        handler: async function (response) {
          const orderObj = {
            qty: 1,
            orderId: Date.now().toString(),
            transactionStatus: 'complete',
            deliveryStatus: 'Pending',
            transactionId: response.razorpay_payment_id,
            notes: `${
              userData$.objectId
            } has made an order of worth Rs. ${calculateTotal()}`,
            userId: userData$.objectId,
            total: calculateTotal(),
            products: products,
            deliveryAddress: {
              __type: 'Pointer',
              className: 'AddressInfo',
              objectId: address.objectId,
            },
          };

          const orderResponse = await CreateOrderApi(orderObj);
          if (orderResponse != null) {
            props$.dispatch(ClearCart());
            props$.history.push('/order-success');
          }
        },
        theme: {
          color: '#B8CD06',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    };

    // End of razor pay
    return (
      <>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12} sm={12}>
              <section className="checkout-card mt-50">
                <div className="checkout-card-heading">
                  <h1>Review Order Detail</h1>
                  <div className="checkout-card-body">
                    <CartItemList noMargin={false} />
                  </div>
                </div>
              </section>

              <section className="checkout-card mt-30">
                <div className="checkout-card-heading">
                  <h1>Shipping Address</h1>
                  <div className="checkout-card-body p-20">
                    {this.props.addressDataLoading &&
                    this.state.addressData.length === 0 ? (
                      <Grid item>
                        <Paper className="p-20">
                          <SingleAddress loading={true} />
                        </Paper>
                      </Grid>
                    ) : (
                      <div>
                        <div>
                          {this.state.addressData.map((address, i) => (
                            <Grid item key={i}>
                              <Paper
                                className={
                                  this.state.selectedShippingAddress
                                    .objectId === address.objectId
                                    ? 'selected p-20 mt-10'
                                    : 'not-selected p-20 mt-10'
                                }
                                onClick={() => handleChangeAddress(address)}
                              >
                                <SingleAddress
                                  addressData={address}
                                  loading={false}
                                  hideDelete={true}
                                  addressSaved={updateAddress.bind(
                                    null,
                                    address
                                  )}
                                />
                              </Paper>
                            </Grid>
                          ))}
                        </div>

                        {this.state.addressData.length === 0 && (
                          <Grid item>
                            <Paper className="p-20 mt-10 text-align-center">
                              No Address
                            </Paper>
                          </Grid>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <section>
                <CartSummary
                  buttonFull={false}
                  onHandleClick={displayRazorpay}
                  buttonText="proceed to payment"
                />
              </section>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.carts.Carts,
  totalItems: state.carts.numberCart,

  authLoading: state.auth.authLoading,
  authData: state.auth.user,
  authError: state.auth.authError,

  addressData: state.address.address.result,
  addressDataLoading: state.address.addressLoading,
  addressError: state.address.addressError,

  saveAddress: state.address.saveAddress,
  saveAddressLoading: state.address.saveAddressLoading,
});

export default connect(mapStateToProps)(Checkout);
