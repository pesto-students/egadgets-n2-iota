import React from 'react';
import Product from './Product';
import '../../../styles/components/Product.css';
import '../../../styles/Style.css';
import { Grid } from '@material-ui/core';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
const _ = require('lodash');

function ProductList({ products, title, showBtn, onViewMoreClick }) {
  return (
    <div className="product-list mt-50">
      <h1>{title}</h1>
      <div className="view-more-wrapper">
        <a href="#!" onClick={onViewMoreClick}>
          View More <DoubleArrowIcon />
        </a>
      </div>
      <Grid container spacing={2}>
        {_(products)
          .take(4)
          .value()
          .map((product) => (
            <Grid key={product.id} item xs={12} md={3} lg={3} sm={6}>
              <Product product={product} showBtn={showBtn} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default ProductList;
