import React, { Component } from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import StyledButton from "../../components/common/form/StyledButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { savingAddressData } from "../../actions/AddressAction";

class SingleAddress extends Component {
  state = { open: false, ...this.props.addressData };

  componentDidUpdate(prevChange) {
    if (
      prevChange.saveAddressLoading === true &&
      this.props.saveAddressLoading === false &&
      this.props.saveAddressError === null
    ) {
      this.props["addressSaved"]({
        ...this.props.address,
        ...this.state,
      });
    }
  }

  render() {
    const handleOpen = () => {
      if (this.state.open) {
        saveAddressData();
      }
      this.setState({ open: !this.state.open });
    };

    const saveAddressData = () => {
      let payload = {
        addressTitle: this.state.addressTitle,
        mobile: Number(this.state.mobile),
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        streetAddress: this.state.streetAddress,
        city: this.state.city,
        state: this.state.state,
        pincode: Number(this.state.pincode),
        objectId: this.state.objectId,
        userId: this.props.authData.objectId,
      };
      this.props.dispatch(savingAddressData(payload));
    };

    const handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    };

    return (
      <div>
        <div className="user-addresses w-100">
          {this.props.loading ? (
            <div className="user-addresses w-100">
              <div className="w-100 mr-10">
                <div className="flex-box">
                  <Skeleton
                    animation="wave"
                    width="20%"
                    className="mr-10"
                  ></Skeleton>
                  <Skeleton animation="wave" width="20%"></Skeleton>
                </div>
                <Skeleton animation="wave" width="100%"></Skeleton>
              </div>
              <Skeleton animation="wave" width="20%"></Skeleton>
            </div>
          ) : (
            <Grid container>
              <Grid item className="user-addresses ">
                <div>
                  <p>
                    {this.state.addressTitle ? (
                      <span className="delivery-tag">
                        {this.state.addressTitle}
                      </span>
                    ) : (
                      ""
                    )}{" "}
                    {this.state.addressTitle ? this.state.addressTitle : ""}{" "}
                    &nbsp;
                    <small>{this.state.mobile ? this.state.mobile : ""}</small>
                  </p>
                  <address>
                    {this.state.firstName
                      ? this.state.firstName
                      : this.state.firstName}
                    {this.state.lastName ? this.state.lastName + "," : ""}{" "}
                    {this.state.streetAddress
                      ? this.state.streetAddress + ","
                      : ""}{" "}
                    {this.state.city ? this.state.city + "," : ""}
                    {this.state.state ? this.state.state : ""}{" "}
                    {this.state.pincode ? "pin -" : ""} {this.state.pincode}
                  </address>
                </div>
              </Grid>
              <Grid item className="ml-auto">
                {!this.state.open ? (
                  <IconButton
                    aria-label="delete"
                    className="ml-auto"
                    onClick={() => {
                      handleOpen();
                    }}
                    disabled={this.props.saveAddressLoading}
                  >
                    <EditIcon />
                  </IconButton>
                ) : (
                  <StyledButton
                    text="Save"
                    customStyle={{
                      backgroundColor: "#b8cd06",
                      margin: "auto 0px auto auto",
                    }}
                    disabled={this.props.saveAddressLoading}
                    onHandleClick={handleOpen}
                  />
                )}
                {!this.props.hideDelete ? (
                  <IconButton
                    aria-label="delete"
                    onClick={this.props.onRemove}
                    disabled={this.props.saveAddressLoading}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          )}
        </div>
        {this.state.open ? (
          <section className="checkout-card mt-50">
            <div className="checkout-card-heading">
              <h1>{this.state.addressTitle}</h1>
              <div className="checkout-card-body p-20">
                <form
                  style={{ width: "100%" }}
                  noValidate
                  autoComplete="off"
                  className="mt-10"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth={true}
                        id="addressTitle"
                        label="Title"
                        variant="outlined"
                        name="addressTitle"
                        value={this.state.addressTitle}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={6} lg={6} sm={6} xs={12}>
                      <TextField
                        fullWidth={true}
                        id="firtname"
                        label="First Name"
                        variant="outlined"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={6} lg={6} sm={6} xs={12}>
                      <TextField
                        id="lastname"
                        label="Last Name"
                        variant="outlined"
                        fullWidth={true}
                        name="lastName"
                        value={this.state.lastName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={6} lg={6} sm={6} xs={12}>
                      <TextField
                        id="street-address"
                        label="Street Address"
                        variant="outlined"
                        fullWidth={true}
                        name="streetAddress"
                        value={this.state.streetAddress}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item md={6} lg={6} sm={6} xs={12}>
                      <TextField
                        fullWidth={true}
                        id="mobile"
                        label="Mobile"
                        variant="outlined"
                        name="mobile"
                        type="number"
                        value={this.state.mobile}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item md={6} lg={6} sm={6} xs={12}>
                      <TextField
                        fullWidth={true}
                        id="city"
                        label="City"
                        variant="outlined"
                        name="city"
                        value={this.state.city}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={6} lg={6} sm={6} xs={12}>
                      <TextField
                        id="state"
                        label="State"
                        variant="outlined"
                        fullWidth={true}
                        name="state"
                        value={this.state.state}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item md={6} lg={6} sm={6} xs={12}>
                      <TextField
                        id="pincode"
                        label="Pincode"
                        variant="outlined"
                        fullWidth={true}
                        name="pincode"
                        type="number"
                        value={this.state.pincode}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </form>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  saveAddressLoading: state.address.saveAddressLoading,
  saveAddressError: state.address.saveAddressError,
  address: state.address.saveAddress,

  authLoading: state.auth.authLoading,
  authData: state.auth.user,
  authError: state.auth.authError,
});

export default connect(mapStateToProps)(SingleAddress);
