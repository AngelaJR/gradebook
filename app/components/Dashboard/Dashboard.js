import React from 'react';
import styles from './styles.css';
import Classroom from 'components/Classroom';
import letterk from '../../images/letterk.png';
import number1 from '../../images/number1.jpg';
import number2 from '../../images/number2.png';
import number3 from '../../images/number3.png';
import number4 from '../../images/number4.png';
import number5 from '../../images/number5.png';

/*
* Parent Component for Dashboard.
* This component creates the main layout of the dasboard.
* div whith className: dashboard-header, contains the header for the dasboard.
* Each <div> inside dashboard-header is the container for the Component Classroom.
* The Component Classrom renders a component for each  grade level form K-5th grade.
* Using props the grade level, image, and banner color is sent to the Classrom Component.
*/
export default class Dashboard extends React.PureComponent {
  render() {
    return (
      <div className="main-dash">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome to your Gradebook</p>
        </div>
        <div className="dashboard-container">
          <div className="col">
            <Classroom
              gradeLevel="Kindergarten"
              gradeImg={letterk}
              gradeColor="#66BB6A"
            />
          </div>
          <div className="col">
            <Classroom
              gradeLevel="1st Grade"
              gradeImg={number1}
              gradeColor="#D4E157"
            />
          </div>
          <div className="col">
            <Classroom
              gradeLevel="2nd Grade"
              gradeImg={number2}
              gradeColor="#FFCA28"
            />
          </div>
          <div className="col">
            <Classroom
              gradeLevel="3rd Grade"
              gradeImg={number3}
              gradeColor="#FF7043"
            />
          </div>
          <div className="col">
            <Classroom
              gradeLevel="4th Grade"
              gradeImg={number4}
              gradeColor="#42A5F5"
            />
          </div>
          <div className="col">
            <Classroom
              gradeLevel="5th Grade"
              gradeImg={number5}
              gradeColor="#7E57C2"
            />
          </div>
        </div>
      </div>
    );
  }
}
