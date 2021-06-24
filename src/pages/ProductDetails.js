import React, { Component } from "react";
import "../styles/components/ProductDetails.css";
import CheckIcon from "@material-ui/icons/Check";
import { connect } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import StyledButton from "../components/common/form/StyledButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";
import ProductDetailCaerousel from "../components/common/Carousel/ProductDetailCaerousel";
import { AddCart } from "../actions/CartAction";
import { NotificationManager } from "react-notifications";
import * as actions from "../actions/ProductDetailsAction";

class ProductDetails extends Component {
  state = {
    selectedIndex: 1,
    quantity: 1,
  };

  handleIndex = (index) => {
    this.setState({ ...this.state, selectedIndex: index });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.dispatch(
      actions.fetchingProductData(this.props.match.params.id)
    );
  }

  componentDidUpdate(prevChange) {
    if (
      prevChange.productDetailsLoading === true &&
      this.props.productDetailsLoading === false &&
      this.props.productDetailsError === null
    ) {
      NotificationManager.success(
        "fetched product details successfully",
        "Success",
        200
      );
    } else if (
      prevChange.productDetailsLoading === true &&
      this.props.productDetailsLoading === false &&
      this.props.productDetailsError
    ) {
      NotificationManager.error(
        this.props.productDetailsError.error
          ? this.props.productDetailsError.error
          : "Problem in fetching product details page",
        "Error",
        this.props.productDetailsError.code
          ? this.props.productDetailsError.code
          : 101
      );
    }
  }

  render() {
    const handleQuantity = (value) => {
      let temp = this.state.quantity + value;
      if (temp > 0 && temp < 11) {
        this.setState({ ...this.state, quantity: temp });
      }
      this.props.productDetails["quantity"] = temp;
    };
    const handleQuantityChange = (event) => {
      if (
        typeof Number(event.target.value) == "number" &&
        this.state.quantity < 11 &&
        event.target.value < 11
      ) {
        this.setState({
          ...this.state,
          [event.target.name]: Number(event.target.value),
        });
        this.props.productDetails["quantity"] = Number(event.target.value);
      }
    };

    const handleAddToCart = () => {
      let productDetailObj = {
        description: this.props.productDetails.description,
        id: this.props.productDetails.objectId,
        image: this.props.productDetails.image1.url,
        isNew: this.props.productDetails.isNew,
        price: this.props.productDetails.finalPrice,
        productName: this.props.productDetails.name,
        quantity: this.props.productDetails.quantity
          ? this.props.productDetails.quantity
          : 1,
      };

      this.props.dispatch(AddCart(productDetailObj));
      NotificationManager.success("Item added to the cart", "Success", 400);
    };

    const handleImageArray = (props) => {
      let temp = [];
      if (props) {
        temp[0] = { image: props.image1.url, tag: props.image1.name };
        temp[1] = { image: props.image2.url, tag: props.image2.name };
        temp[2] = { image: props.image3.url, tag: props.image3.name };
        temp[3] = { image: props.image4.url, tag: props.image4.name };
      }
      return temp;
    };

    const handleDescription = (description) => {
      let tempDescr = description.split("$prod$");
      return tempDescr;
    };
    const handleBuyNow = () => {
      handleAddToCart();
      this.props.history.push("/checkout");
    };

    return (
      <Container>
        <Grid container spacing={4} className="m-auto">
          <Grid item xs={12} md={5} lg={5}>
            <div className="product-desc-image">
              {Object.keys(this.props.productDetails).length === 0 ? (
                <Skeleton variant="rect" width="100%" height="100%">
                  <div style={{ paddingTop: "57%" }} />
                </Skeleton>
              ) : (
                <ProductDetailCaerousel
                  imageArray={handleImageArray(this.props.productDetails)}
                />
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={7} lg={7} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                {Object.keys(this.props.productDetails).length === 0 ? (
                  <Skeleton animation="wave" />
                ) : (
                  <h1 className="capitalize">
                    {this.props.productDetails.name}
                  </h1>
                )}
                {Object.keys(this.props.productDetails).length === 0 ? (
                  <Skeleton animation="wave" />
                ) : (
                  <p className="mt-10">
                    Sell By: {this.props.productDetails.vendorRef.fullName}
                  </p>
                )}
                {Object.keys(this.props.productDetails).length === 0 ? (
                  <Skeleton animation="wave" />
                ) : (
                  <Typography
                    gutterBottom
                    variant="body1"
                    className="mt-10 text-dull text-justify"
                  >
                    {handleDescription(
                      this.props.productDetails.description
                    ).map((desc, i) =>
                      i < 2 ? <span key={i}>{desc}.</span> : ""
                    )}
                  </Typography>
                )}
                {Object.keys(this.props.productDetails).length === 0 ? (
                  <Skeleton animation="wave" />
                ) : (
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    className="flex-box mt-20"
                  >
                    {"Availabiity: "}
                    {this.props.productDetails.stock > 0 ? (
                      <div className="flex-box">
                        <span className="text-success"> In Stock</span>
                        <CheckIcon className="pl-5" />
                      </div>
                    ) : (
                      <div className="flex-box">
                        <p className="text-failure"> Currently Not Available</p>
                        <ClearIcon className="pl-5 text-failure" />
                      </div>
                    )}
                  </Typography>
                )}
                {Object.keys(this.props.productDetails).length === 0 ? (
                  <Skeleton animation="wave" />
                ) : (
                  <Typography
                    variant="subtitle1"
                    className={
                      this.props.productDetails.stock > 0 ? "" : "d-none"
                    }
                  >
                    Rs
                    {this.props.productDetails.bigPrice -
                      this.props.productDetails.finalPrice}
                    Discount Hurry up! only {this.props.productDetails.stock}
                    products left in stock!
                  </Typography>
                )}
                {Object.keys(this.props.productDetails).length === 0 ? (
                  <Skeleton animation="wave" />
                ) : (
                  <h2 className="mt-10">
                    Rs. {this.props.productDetails.finalPrice + " "}
                    <span className="text-failure text-strike font-size-14">
                      Rs. {this.props.productDetails.bigPrice}
                    </span>
                  </h2>
                )}
                <div className="flex-box mt-20">
                  <TextField
                    id="outlined-basic"
                    label="Quantity"
                    variant="outlined"
                    className="quantity-field"
                    name="quantity"
                    inputProps={{ min: 0, max: 10 }}
                    onChange={handleQuantityChange}
                    value={this.state.quantity}
                  />
                  <div className="flex-box flex-col-direction quantity-button">
                    <IconButton
                      className="p-0"
                      onClick={() => handleQuantity(1)}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      className="p-0"
                      onClick={() => handleQuantity(-1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </div>
                </div>

                <div
                  className={
                    this.props.productDetails.stock <= 0
                      ? "disabled flex-box py-10"
                      : "flex-box py-10"
                  }
                >
                  <StyledButton
                    text="Add to cart"
                    customStyle={{
                      marginRight: "5px",
                    }}
                    disabled={this.props.productDetails.stock <= 0}
                    onHandleClick={handleAddToCart}
                  />
                  <StyledButton
                    text="Buy Now"
                    customStyle={{
                      backgroundColor: "#000",
                      marginLeft: "15px",
                    }}
                    disabled={this.props.productDetails.stock <= 0}
                    onHandleClick={handleBuyNow}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div>
          <div className="p-10 mt-10">
            <Typography variant="h6">More Details :</Typography>
            {Object.keys(this.props.productDetails).length === 0 ? (
              <div>
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </div>
            ) : (
              <ul className="pl-15">
                {handleDescription(this.props.productDetails.description).map(
                  (desc, i) => (
                    <li key={i}>
                      <Typography variant="subtitle1">{desc}</Typography>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>

          <div className="p-10">
            <Typography variant="h6">Key Specification :</Typography>

            {Object.keys(this.props.productDetails).length === 0 ? (
              <div>
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </div>
            ) : (
              <ul className="pl-15">
                {handleDescription(
                  this.props.productDetails.keySpecification
                ).map((desc, i) => (
                  <li key={i}>
                    <Typography variant="subtitle1">{desc}</Typography>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  productDetails: state.productDetails.product,
  productDetailsLoading: state.productDetails.productLoading,
  productDetailsError: state.productDetails.productError,
});

export default connect(mapStateToProps)(ProductDetails);
