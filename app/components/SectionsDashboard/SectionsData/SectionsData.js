import React from 'react';
import styles from './styles.css';
import { NavLink } from 'react-router-dom';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Edit from '@material-ui/icons/Create';

/*
* Child Component of Sections.
* This component is in charge of rendering/displaying the section list in the Section view.
* It gets the sections list from the parent component using props.
*    Since the list is an array with an object inside map is user to loop through the list.
*    When it loops through the list it gets the sections ID, name, term, and year.
* The section list is displayed as a HTML table where each row is a section.
* Additionally, each section row is a <NavLink>. When clicked the user will be re-routed to
*    the Student Component.
*    <NavLink> send through the route the sectionID, name, and current grade level.
*
* <NavLink> is imported from react-router-dom
* <Edit>, <DeleteOutlinedIcon> are importer from @material-ui/core.
*   **See https://material-ui.com/ for more information.**
*/
export default class SectionsData extends React.PureComponent {
  // Function when the edit pencil icon (<Edit>) is clicked send through props the section information.
  handleEditClick = e => {
    const idx = e.currentTarget.id;
    this.props.openModalEdit(this.props.sectionList[idx]);
  };

  // Function when the trash can icon (<DeleteOutlinedIcon>) is clicked send through props the section information.
  handleDeleteClick = e => {
    const idx = e.currentTarget.id;
    this.props.openDeleteModal(this.props.sectionList[idx]);
  };

  render() {
    const sectionList = this.props.sectionList.map((section, idx) => (
      <tr key={`setion_${idx}`} id={section.name} className="table-body">
        <td className="section-td">
          <NavLink
            to={`/students/${this.props.gradeLevel}/${section.name}/${
              section.sectionID
            }`}
            style={{ color: 'black', textDecoration: 'none' }}
          >
            {section.name}
          </NavLink>
        </td>
        <td className="section-td">
          <NavLink
            to={`/students/${this.props.gradeLevel}/${section.name}/${
              section.sectionID
            }`}
            style={{ color: 'black', textDecoration: 'none' }}
          >
            {section.term}
          </NavLink>
        </td>
        <td className="section-td">
          <NavLink
            to={`/students/${this.props.gradeLevel}/${section.name}/${
              section.sectionID
            }`}
            style={{ color: 'black', textDecoration: 'none' }}
          >
            {section.year}
          </NavLink>
        </td>
        <td className="section-td icons">
          <Edit id={idx} onClick={this.handleEditClick} />
          <DeleteOutlinedIcon id={idx} onClick={this.handleDeleteClick} />
        </td>
      </tr>
    ));

    return (
      <div className="section-table-container">
        <table className="sections-tb">
          <tbody>{sectionList}</tbody>
        </table>
      </div>
    );
  }
}
