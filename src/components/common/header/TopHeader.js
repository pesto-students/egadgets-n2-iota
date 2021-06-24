import React from 'react';
import ToolbarComponent from './Toolbar';
import DrawerComponent from './Drawer';
class TopHeader extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = () => {
    this.setState({ left: false });
  };

  openDrawer = () => {
    this.setState({
      left: true,
    });
  };

  render() {
    return (
      <div className="App">
        <ToolbarComponent openDrawerHandler={this.openDrawer} />

        <DrawerComponent
          left={this.state.left}
          toggleDrawerHandler={this.toggleDrawer}
        />
      </div>
    );
  }
}

export default TopHeader;
