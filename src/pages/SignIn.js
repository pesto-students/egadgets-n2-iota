import {
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import React, { Component } from "react";
import "../styles/Style.css";
import "../styles/components/SignIn.css";
import StyledButton from "../components/common/form/StyledButton";
import * as actions from "../actions/AuthAction";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";

class SignIn extends Component {
  state = {
    username: "",
    password: "",
    enabledForgotPassword: false,
    emailId: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const cookies = new Cookies();
    const sessionToken = cookies.get(
      "sessionToken",
      this.props.profile.sessionToken
    );
    if (sessionToken) {
      this.props.dispatch(
        actions.fetchingAuthData({
          apiType: "userMe",
          sessionToken,
        })
      );
    }
  }

  componentDidUpdate(prevChange) {
    if (
      prevChange.profileLoading === true &&
      this.props.profileLoading === false &&
      this.props.profileError === null
    ) {
      NotificationManager.success("Login Successfull", "Success", 400);
      const cookies = new Cookies();
      cookies.set("sessionToken", this.props.profile.sessionToken);
      console.log(this.props, prevChange);
      this.props.history.goBack();
    } else if (
      prevChange.profileLoading === true &&
      this.props.profileLoading === false &&
      this.props.profileError
    ) {
      NotificationManager.error(
        this.props.profileError.error,
        "Error",
        this.props.profileError.code
      );
    }

    if (
      prevChange.forgotPasswordLoading === true &&
      this.props.forgotPasswordLoading === false &&
      this.props.forgotPasswordError === null
    ) {
      NotificationManager.success(this.props.forgotPassword, "Success", 400);
      this.setState({ ...this.state, enabledForgotPassword: false });
    } else if (
      prevChange.forgotPasswordLoading === true &&
      this.props.forgotPasswordLoading === false &&
      this.props.forgotPasswordError
    ) {
      console.log(this.props.forgotPasswordError);
      NotificationManager.error(
        this.props.forgotPasswordError.error,
        "Error",
        101
      );
    }
  }

  render() {
    const handleSignIn = () => {
      console.log(this.state);
      this.props.dispatch(
        actions.fetchingAuthData({
          apiType: "signIn",
          username: this.state.username,
          password: this.state.password,
        })
      );
    };

    const handleForgotPassword = () => {
      this.setState({
        ...this.state,
        enabledForgotPassword: !this.state.enabledForgotPassword,
      });
    };

    const dispatchForgotPassword = () => {
      this.props.dispatch(
        actions.fetchingForgotPasswordData(this.state.emailId)
      );
    };

    const handleChange = (event) => {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
      });
    };
    return (
      <Container maxWidth="sm">
        <Grid container className="mt10">
          <Grid item className="w-100">
            <div className="border p10">
              <div className="mt-10 mr-10">
                <Typography variant="h5" className="text-align-center">
                  Login
                </Typography>
              </div>
              {this.state.enabledForgotPassword ? (
                <TextField
                  id="outlined-basic"
                  label="Please enter Email-id"
                  variant="outlined"
                  className="w-100 mt-20 mr-10"
                  name="emailId"
                  value={this.state.emailId}
                  onChange={handleChange}
                />
              ) : (
                <TextField
                  id="outlined-basic"
                  label="Please enter Email-id"
                  variant="outlined"
                  className="w-100 mt-20 mr-10"
                  name="username"
                  value={this.state.username}
                  onChange={handleChange}
                />
              )}

              {!this.state.enabledForgotPassword ? (
                <TextField
                  id="outlined-basic"
                  label="Please enter Password"
                  variant="outlined"
                  className="w-100 mt-20 mr-10"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={handleChange}
                />
              ) : (
                ""
              )}
              {!this.state.enabledForgotPassword ? (
                <div className="flex-box">
                  <p
                    className="ml-auto pt-10 pointer"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password
                  </p>
                </div>
              ) : (
                ""
              )}

              <div className="p-relative">
                {this.state.enabledForgotPassword ? (
                  <div>
                    <StyledButton
                      text="Submit"
                      customStyle={{
                        width: "45%",
                        backgroundColor: "#FF8A00",
                        borderRadius: "5px",
                        marginTop: "20px",
                        marginRight: "5%",
                      }}
                      onHandleClick={() => dispatchForgotPassword()}
                    />
                    <StyledButton
                      text="Cancel"
                      customStyle={{
                        width: "45%",
                        backgroundColor: "#a1a1a1",
                        borderRadius: "5px",
                        marginTop: "20px",
                        marginLeft: "5%",
                      }}
                      onHandleClick={() => handleForgotPassword()}
                    />
                  </div>
                ) : (
                  <StyledButton
                    text="Sign In"
                    customStyle={{
                      width: "100%",
                      backgroundColor: "#FF8A00",
                      borderRadius: "5px",
                      marginTop: "20px",
                    }}
                    onHandleClick={() => handleSignIn()}
                  />
                )}
                {this.props.profileLoading ||
                this.props.forgotPasswordLoading ? (
                  <CircularProgress className="p-absolute loader" size="20px" />
                ) : (
                  ""
                )}
              </div>

              <Typography variant="body2" className="mt-20">
                New To EGadgets ?
                <Link className="link" to="/signup">
                  Register Here
                </Link>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  profileLoading: state.auth.authLoading,
  profile: state.auth.user,
  profileError: state.auth.authError,

  forgotPasswordLoading: state.forgotPassword.forgotPasswordLoading,
  forgotPassword: state.forgotPassword.response,
  forgotPasswordError: state.forgotPassword.forgotPasswordError,
});

export default connect(mapStateToProps)(SignIn);
