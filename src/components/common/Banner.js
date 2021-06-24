import React from 'react';
import '../../styles/components/Banner.css';
import { Link } from 'react-router-dom';
function Banner({ image, url }) {
  return (
    <Link to={url}>
      <div
        style={{
          backgroundImage: `url(${image})`,
        }}
        className="banner"
      ></div>
    </Link>
  );
}

export default Banner;
