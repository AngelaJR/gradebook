import React from 'react';
import styles from './styles.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';

/*
* No Parent Component.
* This Component is in charge of displaying a drop down menu that contains the grade levels.
* Using a <NavLink> a user is re-routed to the desire grade level instead of going to the main page.
*
* <NavLink> is importer from the package react-router-dom.
* <Menu>, <Button>, <MenuItem> is importer from @material-ui/core.
*   **See https://material-ui.com/ for more information.**
*/
export default class GradeMenu extends React.PureComponent {
  // Checks the state of the menu, and changes if a gradeLevel is clicked
  state = {
    anchorEl: null,
  };

  // Function onClick get the current target that was clicked.
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  // Function onClose closes the drop down menu.
  handleClose = e => {
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
          className="grade-menu"
        >
          Grade
          <i className="material-icons">arrow_drop_down</i>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <NavLink
            to="/sections/Kindergarten"
            style={{ textDecoration: 'none' }}
          >
            <MenuItem id="Kindergarten" onClick={this.handleClose}>
              Kindergarten
            </MenuItem>
          </NavLink>
          <NavLink to="/sections/1st Grade" style={{ textDecoration: 'none' }}>
            <MenuItem id="1st Grade" onClick={this.handleClose}>
              1st Grade
            </MenuItem>
          </NavLink>
          <NavLink to="/sections/2nd Grade" style={{ textDecoration: 'none' }}>
            <MenuItem id="2nd Grade" onClick={this.handleClose}>
              2nd Grade
            </MenuItem>
          </NavLink>
          <NavLink to="/sections/3rd Grade" style={{ textDecoration: 'none' }}>
            <MenuItem id="3rd Grade" onClick={this.handleClose}>
              3rd Grade
            </MenuItem>
          </NavLink>
          <NavLink to="/sections/4th Grade" style={{ textDecoration: 'none' }}>
            <MenuItem id="4th Grade" onClick={this.handleClose}>
              4th Grade
            </MenuItem>
          </NavLink>
          <NavLink to="/sections/5th Grade" style={{ textDecoration: 'none' }}>
            <MenuItem id="5th Grade" onClick={this.handleClose}>
              5th Grade
            </MenuItem>
          </NavLink>
        </Menu>
      </div>
    );
  }
}
