import React from 'react';
import styles from './styles.css';
import { NavLink } from 'react-router-dom';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Edit from '@material-ui/icons/Create';

/*
* Child Component of Students.
* This component is in charge of rendering/displaying the students list in the Students view.
* It gets the student list from the parent component using props.
*    Since the list is an array with an object inside map is user to loop through the list.
*    When it loops through the list it gets the students ID, first name, and last name.
* The student list is displayed as a HTML table where each row is a student.
* Additionally, each student's row is a <NavLink>. When clicked the user will be re-routed to
*    the StudentData Component.
*    <NavLink> sends through the route the student's first name, last name, and student id.
*
* <NavLink> is imported from react-router-dom
* <Edit>, <DeleteOutlinedIcon> are importer from @material-ui/core.
*   **See https://material-ui.com/ for more information.**
*/
export default class StudentTable extends React.PureComponent {
  // Function when the trash can icon (<DeleteOutlinedIcon>) is clicked send through props the section information.
  handleDeleteClick = e => {
    const idx = e.currentTarget.id;
    this.props.openModal(this.props.studentsList[idx]);
  };

  // Function when the edit pencil icon (<Edit>) is clicked send through props the student's information.
  handleEditClick = e => {
    const idx = e.currentTarget.id;
    this.props.openModalEdit(this.props.studentsList[idx]);
  };

  render() {
    const studentsList = this.props.studentsList.map((student, idx) => (
      <tr key={`student_${idx}`} className="table-body" id={student.id}>
        <td className="student-td">
          <NavLink
            to={`/students/assessment/${student.first}/${student.last}/${
              student.id
            }`}
            style={{ color: 'black', textDecoration: 'none' }}
          >
            {student.id}
          </NavLink>
        </td>
        <td className="student-td">
          <NavLink
            to={`/students/assessment/${student.first}/${student.last}/${
              student.id
            }`}
            style={{ color: 'black', textDecoration: 'none' }}
          >
            {student.first}
          </NavLink>
        </td>
        <td className="student-td">
          <NavLink
            to={`/students/assessment/${student.first}/${student.last}/${
              student.id
            }`}
            style={{ color: 'black', textDecoration: 'none' }}
          >
            {student.last}
          </NavLink>
        </td>
        <td>
          <Edit id={idx} onClick={this.handleEditClick} />
          <DeleteOutlinedIcon id={idx} onClick={this.handleDeleteClick} />
        </td>
      </tr>
    ));

    return (
      <div className="student-table-container">
        <table className="students-tb">
          <thead>
            <tr>
              <th className="student-th">Id</th>
              <th className="student-th">First</th>
              <th className="student-th">Last</th>
            </tr>
          </thead>
          <tbody>{studentsList}</tbody>
        </table>
      </div>
    );
  }
}
