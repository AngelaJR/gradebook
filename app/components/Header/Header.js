import React from 'react';
import styles from './styles.css';
import { NavLink } from 'react-router-dom';

/*
*
* Header Component.
* The Header Component is  design to show the main header of the entire applications.
* This components is showned in every comoponent of the application. 
*
*/
export default class Header extends React.PureComponent {
  render() {
    return (
      <div className="header-container">
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <h1 className="header-title">
            Grade<strong>book</strong>
          </h1>
        </NavLink>
      </div>
    );
  }
}
