import React from 'react';
import StyledButton from '../common/form/StyledButton';
import { useSelector } from 'react-redux';

function CartSummary({
  onHandleClick,
  buttonFull = true,
  buttonText = 'Proceed to checkout',
}) {
  let totalPrice = 0;
  let items = useSelector((state) => state.carts.Carts);

  const count = items && items.length > 0 ? items.length : 0;

  const calculateTotal = () => {
    totalPrice = 0;
    items.map((item) => (totalPrice += item.quantity * item.price));
    return `Rs. ${Number(totalPrice).toLocaleString('en-IN')}`;
  };

  return (
    <div className="item-summary-container mt-50">
      <h3>Order Summary</h3>
      <div className="item-summary-line">
        <p>Items ({count}):</p>
        <p>{calculateTotal()}</p>
      </div>

      <div className="item-summary-line">
        <p>Shipping cost: </p>
        <p>Free</p>
      </div>
      <div className="item-seperator"></div>
      <div className="item-summary-line">
        <p>
          <strong>Order Total</strong>
        </p>
        <p>{calculateTotal()}</p>
      </div>
      <div style={{ textAlign: buttonFull === false ? 'right' : 'center' }}>
        <StyledButton
          text={buttonText}
          customStyle={{ width: buttonFull ? '100%' : 'auto', borderRadius: 2 }}
          onHandleClick={onHandleClick}
        />
      </div>
    </div>
  );
}

export default CartSummary;
