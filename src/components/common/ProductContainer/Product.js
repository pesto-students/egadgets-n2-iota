import React from 'react';
import StyledButton from '../form/StyledButton';
import { useDispatch } from 'react-redux';
import { AddCart } from '../../../actions/CartAction';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Truncate from 'react-truncate';
function Product({ product, showBtn = false }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(AddCart(product));
    NotificationManager.success('Item added to the cart', 'Success', 400);
  };
  return (
    <div className="product">
      <Link to={`/products/${product.id}`}>
        <div className="image-wrapper">
          <img src={product.image} alt={product.productName} />
        </div>
      </Link>
      <Link to={`/products/${product.id}`}>
        <h2>
          <Truncate lines={1}>{product.productName}</Truncate>
        </h2>
      </Link>
      <h3>{product.brandName}</h3>
      <p className="description">
        <Truncate lines={2}>{product.description}</Truncate>
      </p>
      <p className="price">
        {`Rs. ${Number(product.price).toLocaleString('en-IN')}`}
      </p>
      {showBtn && (
        <StyledButton
          customStyle={{ width: '100%' }}
          onHandleClick={handleClick}
        />
      )}
      {product.isNew && <span className="new">New</span>}
    </div>
  );
}

export default Product;
