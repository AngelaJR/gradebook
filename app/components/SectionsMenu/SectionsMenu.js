import React from 'react';
import styles from './styles.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class SectionsMenu extends React.PureComponent {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          className="sections-menu"
        >
          Sections
          <i className="material-icons"> arrow_drop_down </i>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Section A</MenuItem>
          <MenuItem onClick={this.handleClose}>Section B</MenuItem>
          <MenuItem onClick={this.handleClose}>Section C</MenuItem>
        </Menu>
      </div>
    );
  }
}
