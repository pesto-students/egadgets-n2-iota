import { Container, Divider, Grid } from '@material-ui/core';
import React, { Component } from 'react';
import '../styles/components/OrderHistory.css';
import StyledButton from '../components/common/form/StyledButton';
import { connect } from 'react-redux';
import { fetchingOrdersData } from '../actions/OrdersHistoryAction';
import Truncate from 'react-truncate';
import { Link } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import Cookies from 'universal-cookie';
import { fetchingAuthData } from '../actions/AuthAction';
import { NotificationManager } from 'react-notifications';
const _ = require('lodash');
class OrderHistory extends Component {
  state = {
    totalOrders: 1,
    orders: [],
    search: '',
  };

  componentDidMount() {
    const cookies = new Cookies();
    const sessionToken = cookies.get('sessionToken');

    if (sessionToken === null || sessionToken === undefined) {
      this.props.history.push('/signin');
    } else if (sessionToken && Object.keys(this.props.authData).length > 0) {
      this.props.fetchingOrdersData({ userId: this.props.authData.objectId });
    } else if (sessionToken && Object.keys(this.props.authData).length === 0) {
      this.props.fetchingAuthData({
        apiType: 'userMe',
        sessionToken,
      });
    }
  }

  componentDidUpdate(preProps) {
    if (
      preProps.orderHistoryLoading === true &&
      this.props.orderHistoryLoading === false &&
      this.props.orderHistoryError === null
    ) {
      this.handleOrderStore();
    }

    if (
      preProps.authLoading === true &&
      this.props.authLoading === false &&
      this.props.authError === null
    ) {
      this.props.fetchingOrdersData({ userId: this.props.authData.objectId });
    } else if (
      preProps.authLoading === true &&
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
  }

  handleOrderStore() {
    this.setState({
      orders: this.props.orders,
    });
  }

  render() {
    const handleViewContent = (id) => {
      this.props.history.push(`/products/${id}`);
    };

    return (
      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <h2>Your Orders</h2>
          </Grid>
        </Grid>

        {this.state.orders && this.state.orders.length > 0 ? (
          _.sortBy(this.state.orders, ['createdAt'], ['desc']).map(
            (value, key) => (
              <div key={key}>
                <Grid
                  container
                  className="mt-20 border p-10"
                  direction="column"
                  alignItems="stretch"
                >
                  <Grid item>
                    <Grid container direction="row" spacing={2}>
                      <Grid item md={6} lg={6} sm={6} xs={12}>
                        <p className="p-5">Order Placed</p>
                        <p className="p-5 secondaryText">
                          {new Date(value.createdAt).toLocaleDateString(
                            'en-IN'
                          )}
                        </p>
                      </Grid>
                      <Grid item md={2} lg={2} sm={6} xs={12}>
                        <p className="p-5">Total</p>
                        <p className="p-5 secondaryText">
                          {`Rs. ${Number(value.total).toLocaleString('en-IN')}`}
                        </p>
                      </Grid>

                      <Grid item md={2} lg={2} sm={6} xs={12}>
                        <p className="p-5">Delivery Status</p>
                        <p className="p-5 secondaryText"> {value.status} </p>
                      </Grid>

                      <Grid item md={2} lg={2} sm={6} xs={12}>
                        <p className="pt-5">
                          Order Number - &nbsp;
                          <span className="secondaryText">
                            #{value.orderId}
                          </span>
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Divider /> <br />
                  </Grid>

                  <Grid item>
                    {value.products.map((product) => (
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        alignItems="center"
                      >
                        <Grid item xs={12} md={8} lg={8}>
                          <Grid container alignItems="center">
                            <Grid item md={2} lg={2} sm={6} xs={12}>
                              <img
                                src={product.image}
                                alt="product placeholder"
                                width="60%"
                              />
                            </Grid>
                            <Grid md={10} lg={10} sm={6} xs={12}>
                              <Link to={`/products/${product.id}`}>
                                <p className="pl-5">{product.name}</p>
                              </Link>

                              <p className="secondaryText pt-5 pl-5 text-justify">
                                <Truncate>{product.description}</Truncate>
                              </p>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={2}
                          lg={2}
                          className="text-center"
                        >
                          <span className="chip">Qty: {product.quantity}</span>
                        </Grid>
                        <Grid item xs={12} md={2} lg={2}>
                          {`Rs. ${Number(product.price).toLocaleString(
                            'en-IN'
                          )}`}
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </div>
            )
          )
        ) : this.state.orders.length === 0 &&
          this.state.orderHistoryLoading === false ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>You don't have any orders yet!</p>
            <StyledButton
              text="Explore Products"
              onHandleClick={() => this.props.history.push('/')}
            />
          </div>
        ) : (
          <Grid
            container
            spacing={5}
            alignItems="center"
            style={{
              padding: '10px;',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginTop: '20px',
            }}
          >
            <Grid item md={2} lg={2} xs={12} sm={6}>
              <Skeleton variant="rect" width={150} height={150} />
            </Grid>

            <Grid item md={8} lg={8} xs={12} sm={6}>
              <Skeleton variant="text" />
              <Skeleton width="60%" variant="text" />
              <Skeleton width="40%" variant="text" />
            </Grid>

            <Grid item md={2} lg={2} xs={12} sm={6}>
              <Skeleton />
            </Grid>
          </Grid>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.orderHistoryDetails.orderHistory,
  orderHistoryLoading: state.orderHistoryDetails.orderHistoryLoading,
  orderHistoryError: state.orderHistoryDetails.orderHistoryError,

  authLoading: state.auth.authLoading,
  authData: state.auth.user,
  authError: state.auth.authError,
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchingOrdersData: (userId) => dispatch(fetchingOrdersData(userId)),
    fetchingAuthData: (payload) => dispatch(fetchingAuthData(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
