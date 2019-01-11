import React from 'react';
import styles from './styles.css';
import Header from 'components/Header';
import Dashboard from 'components/Dashboard';
import Sections from 'components/SectionsDashboard/Sections';
import Students from 'components/StudentsDashboard/Students';
import StudentData from 'components/StudentDataDashboard/StudentData';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

// Function that returns the Dashboard component.
const Home = () => (
  <div>
    <Dashboard />
  </div>
);

/*
* Main component.
*  Keeps track of all the Routes needed within the application.
* Four Main routes:
* 1. Home: Main dasboard page for the user to pick grade level.
* 2. Sections: After user picks a grade level it will route the user to the Section list View.
* 3. Students: Once a section is picked the app will re-route to the Student List View.
* 4. Student Data: After a student is selected, the Student Data View will display the graph as well as raw numbers.
*/
export default class MainLayout extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home} exact />
          <Route exact path="/sections/:gradeLevel" component={Sections} />
          <Route
            exact
            path="/students/:gradeLevel/:sectionName/:sectionID"
            component={Students}
          />
          <Route
            exact
            path="/students/assessment/:firstName/:lastName/:studentID"
            component={StudentData}
          />
        </div>
      </Router>
    );
  }
}
