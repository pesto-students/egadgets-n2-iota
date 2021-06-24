import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/components/Item.css';

function Item({ image, url, customStyle = {}, name }) {
  return (
    <Link to={url}>
      <div className="carousel-item">
        <img src={image} alt={image} style={customStyle} />
      </div>
      <p className="category-name">{name}</p>
    </Link>
  );
}

export default Item;
