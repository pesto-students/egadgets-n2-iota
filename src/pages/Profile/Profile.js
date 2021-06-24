import {
  Grid,
  Typography,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  TextField,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import React, { Component } from 'react';
import '../../styles/components/Profile.css';
import BusinessIcon from '@material-ui/icons/Business';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StyledButton from '../../components/common/form/StyledButton';
import Cookies from 'universal-cookie';
import { savingProfileData } from '../../actions/ProfileAction';
import { connect } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { fetchingAuthData, resetAuthData } from '../../actions/AuthAction';
import { NotificationManager } from 'react-notifications';
import AddressManage from '../AddressManage';
import Truncate from 'react-truncate';
import { trimText } from '../../helpers/Util';

class Profile extends Component {
  state = {
    gender: '',
    email: '',
    phone: '',
    name: '',
    editable: true,
    enableProfile: true,
    enableAddress: false,
    user: '',
    userId: '',
    initaladdress: {
      addressTitle: 'home',
      city: '',
      className: 'AddressInfo',
      firstName: '',
      lastName: '',
      mobile: '',
      pincode: '',
      state: '',
      streetAddress: '',
    },
    sessionToken: '',
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const cookies = new Cookies();
    const sessionToken = cookies.get('sessionToken');
    this.setState({ ...this.state, sessionToken });
    if (sessionToken && Object.keys(this.props.authData).length > 0) {
      this.setState({
        gender: this.props.authData.Gender
          ? this.props.authData.Gender
          : 'female',
        email: this.props.authData.email,
        phone: Number(this.props.authData.mobile),
        name: this.props.authData.name,
      });
      this.setState({ user: this.props.authData });
      this.setState({
        initaladdress: {
          ...this.state.initaladdress,
          firstName: this.props.authData.name,
          mobile: this.props.authData.mobile,
        },
      });
    } else if (sessionToken) {
      this.props.dispatch(
        fetchingAuthData({
          apiType: 'userMe',
          sessionToken,
        })
      );
    } else {
      this.props.history.push('/signin');
    }
  }

  componentDidUpdate(prevChange) {
    if (
      prevChange.authLoading === true &&
      this.props.authLoading === false &&
      this.props.authError === null
    ) {
      this.setState({
        ...this.state,
        gender: this.props.authData.Gender
          ? this.props.authData.Gender
          : 'female',
        email: this.props.authData.email,
        phone: Number(this.props.authData.mobile),
        name: this.props.authData.name,
      });
      this.setState({ user: this.props.authData });
    } else if (
      prevChange.authLoading === true &&
      this.props.authLoading === false &&
      this.props.authError
    ) {
      NotificationManager.error(
        this.props.authError.error
          ? this.props.authError.error
          : 'Problem in getting user session data',
        'Error',
        this.props.authError.code ? this.props.authError.code : 101
      );
      this.props.history.push('/signin');
    }

    if (
      prevChange.saveProfileSavingLoading === true &&
      this.props.saveProfileSavingLoading === false &&
      this.props.saveProfileError === null
    ) {
      NotificationManager.success('saved successfully', 'Success', 200);
      const cookies = new Cookies();
      const sessionToken = cookies.get('sessionToken');
      this.props.dispatch(
        fetchingAuthData({
          apiType: 'userMe',
          sessionToken,
        })
      );
      this.setState({ ...this.state, editable: !this.state.editable });
    } else if (
      prevChange.saveProfileSavingLoading === true &&
      this.props.saveProfileSavingLoading === false &&
      this.props.saveProfileError
    ) {
      NotificationManager.error(
        this.props.saveProfileError.error
          ? this.props.saveProfileError.error
          : 'Problem in saving profile',
        'Error',
        this.props.saveProfileError.code
          ? this.props.saveProfileError.code
          : 101
      );
    }
  }

  render() {
    const handleChange = (event) => {
      this.setState({ ...this.state, gender: event.target.value });
    };
    const handleEditing = () => {
      this.setState({ ...this.state, editable: !this.state.editable });
    };
    const handleInput = (event) => {
      this.setState({ ...this.state, [event.target.name]: event.target.value });
    };

    const handlePage = (value) => {
      if (value === 'profileInfo') {
        this.setState({ enableProfile: true });
        this.setState({ enableAddress: false });
      } else if (value === 'addressInfo') {
        this.setState({ enableAddress: true });
        this.setState({ enableProfile: false });
      }
    };

    const handleSave = () => {
      let saveProfile = {
        Gender: this.state.gender,
        name: this.state.name,
        mobile: this.state.phone + '',
        email: this.state.email,
        objectId: this.state.userId
          ? this.state.userId
          : this.state.user.objectId,
      };
      this.props.dispatch(
        savingProfileData(saveProfile, this.state.sessionToken)
      );
    };
    const handleLogout = () => {
      const cookies = new Cookies();
      this.props.dispatch(resetAuthData());
      cookies.remove('sessionToken');
      NotificationManager.success('Logged Out successfully', 'Success', 200);
      this.props.history.push('/');
    };

    return (
      <div>
        <Container>
          <Grid container direction="row" spacing={3} alignItems="stretch">
            <Grid item xs={3}>
              <Grid
                container
                direction="column"
                alignItems="stretch"
                className="h-100"
              >
                <Grid item className="border p-10 ">
                  <Grid container justify="flex-start" alignItems="center">
                    <Grid item>
                      {this.props.authLoading && !!!this.state.name ? (
                        <Skeleton
                          animation="wave"
                          variant="circle"
                          width={40}
                          height={40}
                        ></Skeleton>
                      ) : (
                        <Tooltip title={this.state.name}>
                          <img
                            src="/assets/icons/userIcon.svg"
                            className="icons"
                            alt=""
                          ></img>
                        </Tooltip>
                      )}
                    </Grid>

                    {this.props.authLoading && !!!this.state.name ? (
                      <Grid item className="hide-info ">
                        <Skeleton
                          animation="wave"
                          width="100px"
                          className="ml-10"
                        ></Skeleton>
                        <Skeleton
                          animation="wave"
                          width="100px"
                          className="ml-10"
                        ></Skeleton>
                      </Grid>
                    ) : (
                      <Grid item className="hide-info flex-1">
                        <Typography
                          variant="body1"
                          className=" pl-15 p-5 capitalize w-100"
                        >
                          <Truncate className="w-100" lines={3}>
                            {trimText(this.state.name, 20)}
                          </Truncate>
                        </Typography>
                        <Typography
                          variant="body1"
                          className=" pl-10 p-5 font-size-14 font-color-gray"
                        >
                          <Truncate className="w-100" lines={1}>
                            {'('}
                            {this.state.email}
                            {')'}
                          </Truncate>
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>

                <Grid item className="border p-10 mt-10 flex-1">
                  <Grid
                    container
                    direction="column"
                    spacing={2}
                    className="h-100"
                  >
                    <Grid
                      container
                      justify="flex-start"
                      alignItems="center"
                      className="p-10"
                    >
                      <Grid item>
                        {this.props.authLoading && !!!this.state.name ? (
                          <Skeleton
                            animation="wave"
                            variant="circle"
                            width={40}
                            height={40}
                          ></Skeleton>
                        ) : (
                          <Tooltip title="Profile Information">
                            <IconButton
                              onClick={() => handlePage('profileInfo')}
                            >
                              <AccountCircleIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Grid>
                      <Grid item className="hide-info">
                        {this.props.authLoading && !!!this.state.name ? (
                          <Skeleton
                            animation="wave"
                            width="100px"
                            className="ml-10"
                          ></Skeleton>
                        ) : (
                          <p
                            className=" pl-10 pointer"
                            onClick={() => handlePage('profileInfo')}
                          >
                            Profile Information
                          </p>
                        )}
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      justify="flex-start"
                      alignItems="center"
                      className="p-10"
                    >
                      <Grid item>
                        {this.props.authLoading && !!!this.state.name ? (
                          <Skeleton
                            animation="wave"
                            variant="circle"
                            width={40}
                            height={40}
                          ></Skeleton>
                        ) : (
                          <Tooltip title="Manage Address">
                            <IconButton
                              onClick={() => handlePage('addressInfo')}
                            >
                              <BusinessIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Grid>
                      <Grid item className="hide-info">
                        {this.props.authLoading && !!!this.state.name ? (
                          <Skeleton
                            animation="wave"
                            width="100px"
                            className="ml-10"
                          ></Skeleton>
                        ) : (
                          <p
                            className="pl-10 pointer"
                            onClick={() => handlePage('addressInfo')}
                          >
                            Manage Addresses
                          </p>
                        )}
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      justify="flex-start"
                      alignItems="center"
                      className="mt-auto"
                    >
                      <Grid item>
                        <Tooltip title="Logout">
                          <IconButton onClick={() => handleLogout()}>
                            <img
                              src="/assets/icons/logout.svg"
                              className="icons ml-5"
                              alt=""
                            ></img>
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item className="hide-info">
                        <p
                          className="text-align-center pointer"
                          onClick={() => handleLogout()}
                        >
                          Logout
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={9} className="min-height-70vh">
              {this.state.enableProfile ? (
                <Grid
                  container
                  direction="column"
                  className="border p-10 h-100"
                  justify="center"
                >
                  <Grid item>
                    <Grid container>
                      <Grid item className=" flex-box ml-auto mr-auto">
                        <h3 className="text-align-center flex-1 ">
                          Profile Information
                        </h3>
                      </Grid>

                      <Grid item>
                        {!this.state.editable ? (
                          <StyledButton
                            text="Save"
                            customStyle={{
                              backgroundColor: '#b8cd06',
                              marginLeft: '5px',
                            }}
                            onHandleClick={handleSave.bind(this)}
                          />
                        ) : (
                          <StyledButton
                            text="Edit"
                            customStyle={{
                              backgroundColor: '#ff8a00',
                              marginLeft: '5px',
                            }}
                            onHandleClick={handleEditing}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item className="mt-20 pl-10">
                    <p className="pb-10">Name</p>

                    {this.props.authLoading && !!!this.state.name ? (
                      <Skeleton animation="wave" width="100%" className="p-10">
                        <div className="p-20"></div>{' '}
                      </Skeleton>
                    ) : (
                      <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        name="name"
                        className="w-100"
                        disabled={this.state.editable}
                        value={this.state.name}
                        onChange={handleInput}
                      />
                    )}
                  </Grid>

                  <Grid item className="mt-20 pl-10">
                    {this.props.authLoading && !!!this.state.name ? (
                      <div>
                        <p className="pb-10">Gender</p>
                        <div className="flex-box">
                          <Skeleton
                            animation="wave"
                            variant="circle"
                            width="15px"
                          ></Skeleton>
                          <Skeleton
                            animation="wave"
                            width="100px"
                            className="ml-10 p-10"
                          ></Skeleton>
                          <Skeleton
                            animation="wave"
                            variant="circle"
                            width="15px"
                            className="ml-10"
                          ></Skeleton>
                          <Skeleton
                            animation="wave"
                            width="100px"
                            className="ml-10 p-10"
                          ></Skeleton>
                        </div>
                      </div>
                    ) : (
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                          aria-label="gender"
                          name="gender1"
                          className="flex-box flex-row"
                          value={this.state.gender}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                            disabled={this.state.editable}
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                            disabled={this.state.editable}
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                  </Grid>
                  <Grid item className="mt-20 pl-10">
                    <p className="pb-10">Phone Number</p>
                    {this.props.authLoading && !!!this.state.name ? (
                      <Skeleton animation="wave" width="100%" className="p-10">
                        <div className="p-20"></div>{' '}
                      </Skeleton>
                    ) : (
                      <TextField
                        id="outlined-basic"
                        label="Phone Number"
                        variant="outlined"
                        name="phone"
                        className="w-100"
                        value={this.state.phone}
                        disabled={this.state.editable}
                        onChange={handleInput}
                      />
                    )}
                  </Grid>

                  <Grid item className="mt-20">
                    <div className="p-10">
                      <Typography variant="subtitle2" className="d-block">
                        FAQ
                      </Typography>
                      <Typography
                        variant="body2"
                        className="d-block font-color-green"
                      >
                        What happens when I update my email address(or mobile
                        number) ?
                      </Typography>
                      <Typography variant="body2" className="d-block">
                        Your login email id(or mobile number) changes,
                        likewise.You 'll receive all your account related
                        communication on your updated email address(or mobile
                        number).
                      </Typography>
                      <Typography
                        variant="body2"
                        className="d-block font-color-green mt-10"
                      >
                        When will my EGadgets account be updated with the new
                        email address(or mobile number) ?
                      </Typography>
                      <Typography variant="body2" className="d-block">
                        It happens as soon as you confirm the verification code
                        sent to your email(or mobile) and save the changes.
                      </Typography>
                      <Typography
                        variant="body2"
                        className="d-block font-color-green mt-10"
                      >
                        Does my Seller account get affected when I update my
                        email address ?
                      </Typography>
                      <Typography variant="body2" className="d-block">
                        EGadgets has a 'single sign-on' policy.Any changes will
                        reflect in your Seller account also
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              ) : (
                ''
              )}

              {this.state.enableAddress ? (
                <div className=" border p-10 h-100">
                  <AddressManage className="h-100" isFromProfile={true} />
                </div>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  savedProfileDetails: state.profile.profile,
  saveProfileSavingLoading: state.profile.profileLoading,
  saveProfileError: state.profile.profileError,

  authLoading: state.auth.authLoading,
  authData: state.auth.user,
  authError: state.auth.authError,
});

export default connect(mapStateToProps)(Profile);
