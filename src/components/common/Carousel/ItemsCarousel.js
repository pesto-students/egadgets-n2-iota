import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Item from './Item';
import Slider from 'react-slick';

function ItemsCarousel({ items, settings, customStyle }) {
  return (
    <div>
      <Slider {...settings}>
        {items.map(({ id, image, url, name }) => (
          <Item
            key={id}
            image={image}
            url={url}
            name={name}
            customStyle={customStyle}
          />
        ))}
      </Slider>
    </div>
  );
}

export default ItemsCarousel;
