import React, { Component } from "react";
import { Grid, Container, Paper } from "@material-ui/core";
import { connect } from "react-redux";
import SingleAddress from "../components/common/SingleAddress";
import Cookies from "universal-cookie";
import * as addressAction from "../actions/AddressAction";
import StyledButton from "../components/common/form/StyledButton";
import { fetchingAuthData } from "../actions/AuthAction";
import { NotificationManager } from "react-notifications";

class AddressManage extends Component {
  state = {
    addressData: [],
    id: 1,
    deleteAddressId: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const cookies = new Cookies();
    const sessionToken = cookies.get("sessionToken");
    if (sessionToken && Object.keys(this.props.authData).length > 0) {
      this.props.dispatch(
        addressAction.fetchingAddressData(this.props.authData.objectId)
      );
    } else if (sessionToken) {
      this.props.dispatch(
        fetchingAuthData({
          apiType: "userMe",
          sessionToken,
        })
      );
    } else {
      this.props.history.push("/signin");
    }
  }

  componentDidUpdate(prevChange) {
    if (
      prevChange.addressDataLoading === true &&
      this.props.addressDataLoading === false &&
      this.props.addressError === null
    ) {
      if (this.props.addressData && this.props.addressData.length > 0) {
        this.setState({ ...this.state, addressData: this.props.addressData });
      }
    } else if (
      prevChange.addressDataLoading === true &&
      this.props.addressDataLoading === false &&
      this.props.addressError
    ) {
      NotificationManager.error(
        this.props.addressError.error
          ? this.props.addressError.error
          : "Error in fetching address data",
        "Error",
        this.props.addressError.code ? this.props.addressError.code : 101
      );
    }

    if (
      prevChange.saveAddressLoading === true &&
      this.props.saveAddressLoading === false &&
      this.props.addressError === null
    ) {
      if (this.props.saveAddress) {
        NotificationManager.success(
          "Address saved successfully",
          "Success",
          200
        );
      }
    }

    if (
      prevChange.deleteAddressLoading === true &&
      this.props.deleteAddressLoading === false &&
      this.props.deleteAddressError === null
    ) {
      NotificationManager.success(
        "Address Deleted successfully",
        "Success",
        200
      );
      let add = this.state.addressData.filter(
        (ele) => ele["objectId"] !== this.state.deleteAddressId
      );

      this.setState({ ...this.state, addressData: add });
    }

    if (
      prevChange.authLoading === true &&
      this.props.authLoading === false &&
      this.props.authError === null
    ) {
      this.props.dispatch(
        addressAction.fetchingAddressData(this.props.authData.objectId)
      );
    } else if (
      prevChange.authLoading === true &&
      this.props.authLoading === false &&
      this.props.authError
    ) {
      NotificationManager.error(
        this.props.authError.error
          ? this.props.authError.error
          : "Problem in getting user session data",
        "Error",
        this.props.authError.code ? this.props.authError.code : 101
      );
      this.props.history.push("/signin");
    }
  }

  render() {
    const handleAdd = () => {
      let addressData = {
        addressTitle: "",
        mobile: "",
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        state: "",
        pincode: "",
        open: true,
      };

      this.setState({
        addressData: [
          ...this.state.addressData,
          { ...addressData, id: this.state.id++ },
        ],
      });
    };

    const removeAddress = (address) => {
      if (address.objectId) {
        this.props.dispatch(
          addressAction.deletingAddressData(address.objectId)
        );
        this.setState({ deleteAddressId: address.objectId });
      } else {
        let add = this.state.addressData.filter(
          (ele) => ele["id"] !== address["id"]
        );

        this.setState({ ...this.state, addressData: add });
      }
    };

    const updateAddress = (address, savedAddress) => {
      if (savedAddress.id) {
        let updated = JSON.parse(JSON.stringify(this.state.addressData));
        updated = updated.filter(
          (ele) => !(ele.id && ele.id === savedAddress.id)
        );
        updated.push(savedAddress);
        this.setState({ ...this.state, addressData: updated });
      }
    };

    return (
      <Container>
        <Grid
          container
          direction="column"
          className={this.props.isFromProfile ? "h-100" : "border p-10 h-100"}
        >
          <Grid item>
            <div className="w-100 flex-box">
              <h3 className="text-align-center flex-1 p-10">
                Address Information
              </h3>
              <StyledButton
                text="Add"
                customStyle={{
                  backgroundColor: "#FF8A00",
                  marginLeft: "auto",
                }}
                onHandleClick={handleAdd}
              />
            </div>
          </Grid>

          {this.props.addressDataLoading &&
          this.state.addressData.length === 0 ? (
            <Grid item>
              <Paper className="p-20">
                <SingleAddress loading={true} />
              </Paper>
            </Grid>
          ) : (
            <div>
              {this.state.addressData &&
                this.state.addressData.length > 0 &&
                this.state.addressData.map((address, i) => (
                  <Grid item key={i}>
                    <Paper className="p-20 mt-10">
                      <SingleAddress
                        addressData={address}
                        loading={false}
                        onRemove={removeAddress.bind(null, address)}
                        addressSaved={updateAddress.bind(null, address)}
                      />
                    </Paper>
                  </Grid>
                ))}
              {this.state.addressData.length === 0 ? (
                <Grid item>
                  <Paper className="p-20 mt-10 text-align-center">
                    No Address
                  </Paper>
                </Grid>
              ) : (
                " "
              )}
            </div>
          )}
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  addressData: state.address.address.result,
  addressDataLoading: state.address.addressLoading,
  addressError: state.address.addressError,

  saveAddress: state.address.saveAddress,
  saveAddressLoading: state.address.saveAddressLoading,
  deleteAddressData: state.address.deleteAddress,
  deleteAddressLoading: state.address.deleteAddressLoading,
  deleteAddressError: state.address.deleteAddressError,

  authLoading: state.auth.authLoading,
  authData: state.auth.user,
  authError: state.auth.authError,
});

export default connect(mapStateToProps)(AddressManage);
