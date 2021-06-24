import React from 'react';
import '../../styles/components/Cart.css';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import Truncate from 'react-truncate';
import {
  IncreaseQuantity,
  DecreaseQuantity,
  DeleteCart,
} from '../../actions/CartAction';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
function CartItemList({ noMargin = true }) {
  let listCart = useSelector((state) => state.carts.Carts);
  const dispatch = useDispatch();

  return (
    <div className={noMargin ? 'mt-50' : ''}>
      <table className="cart-table ">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {listCart.map((item, key) => (
            <tr key={key}>
              <td width="500px">
                <Link to={`/products/${item.id}`}>
                  <div className="cart-image-container">
                    <img src={item.image} alt={item.productName} />
                    <div>
                      <Truncate line={1}>{item.name}</Truncate>
                    </div>
                  </div>
                </Link>
              </td>
              <td width="200px">Rs. {item.price}</td>
              <td>
                <div className="quantity-container">
                  <div>
                    <RemoveIcon
                      onClick={() => dispatch(DecreaseQuantity(key))}
                    />
                  </div>
                  <div>{item.quantity}</div>
                  <div>
                    <AddIcon onClick={() => dispatch(IncreaseQuantity(key))} />
                  </div>
                </div>
              </td>
              <td width="200px">Rs. {item.price * item.quantity}</td>
              <td>
                <span className="remove-item-icon">
                  <IconButton color="inherit">
                    <CloseIcon onClick={() => dispatch(DeleteCart(key))} />
                  </IconButton>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartItemList;
