import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Container } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Cookies from 'universal-cookie';
import { fetchingAuthData } from '../../../actions/AuthAction';
import { trimText } from '../../../helpers/Util';
import { withRouter } from 'react-router-dom';
const styles = (theme) => ({
  nameWrapper: {
    textAlign: 'right',
    position: 'relative',
    top: '5px',
    right: '10px',
    fontWeight: 'bold',
  },
  menuButton: {
    marginRight: theme.spacing(3),
    display: 'none',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: '#fff',
    border: '1px solid #999',
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    flexGrow: 1,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    right: 0,
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class ToolbarComponent extends React.Component {
  componentDidMount() {
    const cookies = new Cookies();
    const sessionToken = cookies.get('sessionToken');

    if (sessionToken && Object.keys(this.props.authData).length === 0) {
      this.props.fetchingAuthData({
        apiType: 'userMe',
        sessionToken,
      });
    }
  }

  state = {
    achorEl: false,
    MobileMoreAnchorEl: false,
    anchorEl: null,
    dropDownEl: null,
    search: '',
  };

  handleSearch = () => {
    if (this.state.search.trim() === '') {
      return;
    }

    this.props.history.push(`/shop?type=search&keyword=${this.state.search}`);
    window.location.reload();
  };

  handleClick = (event) => {
    console.log(event.currentTarget);
    console.log(this.state);
    this.setState({
      dropDownEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      dropDownEl: null,
    });
  };

  handleMenuClose = () => {
    this.setState({
      achorEl: null,
      mobileMoreAnchorEl: null,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.grow}>
        <AppBar position="fixed" color="default">
          <Container>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton + ' hide-menu'}
                color="inherit"
                aria-label="open drawer"
                onClick={this.props.openDrawerHandler}
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                <Link to="/" className="logo">
                  EGadets
                </Link>
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon} onClick={this.handleSearch}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="search by press enter..."
                  style={{ width: '95%', padding: '2px 20px' }}
                  inputProps={{ 'aria-label': 'search by press enter...' }}
                  value={this.state.search}
                  onChange={(e) => this.setState({ search: e.target.value })}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      this.handleSearch();
                    }
                  }}
                />
              </div>
              <div className={classes.sectionDesktop}>
                <MenuItem onClick={this.handleClick}>
                  <Typography variant="body1" className={classes.title}>
                    {this.props.authData != null &&
                    Object.keys(this.props.authData).length > 0 ? (
                      <p>Hi {trimText(this.props.authData.name, 10)}</p>
                    ) : (
                      'Account'
                    )}
                  </Typography>
                  <ExpandMoreIcon />
                </MenuItem>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.dropDownEl}
                  keepMounted
                  open={Boolean(this.state.dropDownEl)}
                  onClose={this.handleClose}
                  style={{ top: '50px' }}
                >
                  <MenuItem onClick={this.handleClose}>
                    <NavLink to="/profile" onClick={this.handleClose}>
                      Profile
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink to="/address" onClick={this.handleClose}>
                      Address
                    </NavLink>
                  </MenuItem>
                </Menu>
                <MenuItem>
                  <NavLink to="/orders">Orders</NavLink>
                </MenuItem>
              </div>
              <Link to="/cart">
                <IconButton color="inherit">
                  <Badge badgeContent={this.props.numberCart} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    numberCart: state?.carts?.numberCart,
    authLoading: state.auth.authLoading,
    authData: state.auth.user,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingAuthData: (payload) => dispatch(fetchingAuthData(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(ToolbarComponent)));
