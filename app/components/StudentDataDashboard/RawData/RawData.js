import React from 'react';
import styles from './styles.css';
import { getFormattedData } from './dataFormattedHelper.js';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Edit from '@material-ui/icons/Create';
import PlusIcon from '@material-ui/icons/Add';

/*
* Child comoponent of StudentData.
* This component is in charge of drawing/rendering the Raw Data.
* The componet uses a helper in order to format the data from the server to the appropiate structure
*   in order to display it in an HTML table.
*
* <DeleteOutlinedIcon>, <Edit>, <PlusIcon> are importer from @material-ui/core.
*   **See https://material-ui.com/ for more information.**
*/
export default class StudentTable extends React.PureComponent {
  // Function when the trash can icon (<DeleteOutlinedIcon>) is clicked send through props the students id so it can be deleted.
  handleDeleteClick = e => {
    const id = e.currentTarget.id;
    this.props.openDeleteModal(id);
  };

  render() {
    const data = this.props.studentData;
    const formattedData = getFormattedData(data);
    const standardData = formattedData.map((standard, idx) => (
      <tr key={`standard_${idx}`} className="table-body">
        <td className="standard-td">{standard.date}</td>
        <td className="standard-td">{standard.Connect}</td>
        <td className="standard-td">{standard.Create}</td>
        <td className="standard-td">{standard.Perform}</td>
        <td className="standard-td">{standard.Respond}</td>
        <td>
          <DeleteOutlinedIcon
            id={standard.date}
            onClick={this.handleDeleteClick}
          />
        </td>
      </tr>
    ));

    return (
      <div className="standard-table-container">
        <p className="header-student">
          Student: {this.props.studentID} {this.props.firstName}{' '}
          {this.props.lastName}
        </p>
        <table className="standard-tb">
          <thead>
            <tr>
              <th className="standard-th">Date</th>
              <th className="standard-th">Connect</th>
              <th className="standard-th">Create</th>
              <th className="standard-th">Perform</th>
              <th className="standard-th">Respond</th>
            </tr>
          </thead>
          <tbody>{standardData}</tbody>
        </table>
      </div>
    );
  }
}
