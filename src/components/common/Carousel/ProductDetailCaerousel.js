import React from "react";
import { Carousel } from "react-responsive-carousel";
import "../../../styles/components/productCaerousel.css";

const ProductDetailCaerousel = (props) => {
  return (
    <Carousel autoPlay className="carousel-prod">
      {props.imageArray.map((image, index) => (
        <div key={index} className="border">
          <img alt="" src={image.image} />
        </div>
      ))}
    </Carousel>
  );
};
export default ProductDetailCaerousel;
