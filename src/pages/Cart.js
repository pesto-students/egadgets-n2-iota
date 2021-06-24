import { Container, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import CartItemList from '../components/cart/CartItemList';
import StyledButton from '../components/common/form/StyledButton';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartSummary from '../components/cart/CartSummary';

function Cart() {
  const history = useHistory();
  let totalItems = useSelector((state) => state.carts.numberCart);
  console.log(useSelector((state) => state));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Container>
        {totalItems && totalItems > 0 ? (
          <Grid container spacing={2}>
            <Grid item md={9} lg={9} sm={12} xs={12}>
              <CartItemList hideFooter="true" />
            </Grid>
            <Grid item md={3} lg={3} sm={12} xs={12}>
              <CartSummary onHandleClick={() => history.push('/checkout')} />
            </Grid>
          </Grid>
        ) : (
          <div className="mt-50 empty-cart">
            <img src="/assets/empty-cart.png" alt="Empty cart" />
            <p>There is no item in the cart</p>
            <StyledButton
              text="Explore products"
              customStyle={{ borderRadius: 4 }}
              onHandleClick={() => history.push('/')}
            />
          </div>
        )}
      </Container>
    </div>
  );
}

export default Cart;
