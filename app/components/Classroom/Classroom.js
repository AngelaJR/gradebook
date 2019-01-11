import React from 'react';
import styles from './styles.css';
import { NavLink } from 'react-router-dom';

/*
* Child Component of Dashboard.
* This Component is in charge of dynamically change the style of each container of the grade levels.
* Using props sent from the Parent Component Dashboard. the react renders according to
*   the name, image, and banner color.
*
* Each Clasroom Component has a <NavLink> so when user clicks in component, the user is re-routed
*   to the Sections Component.
*   The route will include localhost:3000/sections/grade-level-name. Ex: localhost:3000/sections/1st%Geade.
*/
export default class Classroom extends React.PureComponent {
  render() {
    return (
      <div>
        <NavLink
          to={`/sections/${this.props.gradeLevel}`}
          style={{ color: 'black', textDecoration: 'none' }}
        >
          <div className="grade-level-container">
            <img className="grade-level-img" src={[this.props.gradeImg]} />
            <div
              style={{ backgroundColor: this.props.gradeColor }}
              className="grade-level-name"
            >
              {this.props.gradeLevel}
            </div>
          </div>
          <div />
        </NavLink>
      </div>
    );
  }
}
