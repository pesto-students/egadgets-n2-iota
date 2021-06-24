import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ListItem, ListItemText, Collapse } from '@material-ui/core';
import menusData from '../../../data/Menus';
import { fetchingAuthData } from '../../../actions/AuthAction';
import { connect } from 'react-redux';

const styles = (theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuHeader: {
    backgroundColor: '#B8CD06',
    padding: '15px 0px',
    textAlign: 'center',
    color: '#fff',
    textTransform: 'capitalize',
  },
});

class DrawerComponent extends React.Component {
  state = {
    left: false,
  };

  handleClick(item) {
    this.setState((prevState) => ({ [item.name]: !prevState[item.name] }));
  }
  handler(children) {
    const { classes } = this.props;
    const { state } = this;
    return children.map((subOption) => {
      if (!subOption.children) {
        return (
          <div
            key={subOption.name}
            onClick={this.props.toggleDrawerHandler}
            onKeyDown={this.props.toggleDrawerHandler}
          >
            <ListItem button key={subOption.name}>
              <Link to={subOption.url} className={classes.links}>
                <ListItemText inset primary={subOption.name} />
              </Link>
            </ListItem>
          </div>
        );
      }
      return (
        <div key={subOption.name}>
          <ListItem button onClick={() => this.handleClick(subOption)}>
            <ListItemText inset primary={subOption.name} />
            {state[subOption.name] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={state[subOption.name]} timeout="auto" unmountOnExit>
            {this.handler(subOption.children)}
          </Collapse>
        </div>
      );
    });
  }

  render() {
    const { classes } = this.props;

    const sideList = () => (
      <div className={classes.list} role="presentation">
        <div className={`logo ${classes.menuHeader}`}>EGadgets</div>
        {this.handler(menusData(this.props.authData))}
      </div>
    );

    return (
      <Drawer
        elevation={16}
        open={this.props.left}
        onClose={this.props.toggleDrawerHandler}
      >
        {sideList('left')}
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
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
)(withStyles(styles)(DrawerComponent));
