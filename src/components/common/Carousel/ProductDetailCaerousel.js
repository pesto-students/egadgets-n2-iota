import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import "../../../styles/components/productCaerousel.css";

// const ProductDetailCaerousel = (props) => {
//   return (
//     <Carousel autoPlay className="carousel-prod">
//       {props.imageArray.map((image, index) => (
//         <div key={index} className="border">
//           <img alt="" src={image.image} />
//         </div>
//       ))}
//     </Carousel>
//   );
// };

class ProductDetailCaerousel extends Component {
  state = {};
  abortController = new AbortController();

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    return (
      <>
        <div>
          {this.props && this.props.imageArray ? (
            <Carousel autoPlay className="carousel-prod">
              {this.props.imageArray.map((image, index) => (
                <div key={index} className="border">
                  <img alt="" src={image.image} />
                </div>
              ))}
            </Carousel>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default ProductDetailCaerousel;
