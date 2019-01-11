import React from 'react';
import PropTypes from 'prop-types';
import styles2 from './styles.css';
import GradeMenu from 'components/GradeMenu';
import Graph from 'components/StudentDataDashboard/Graph';
import AddStandardColumn from 'components/StudentDataDashboard/AddStandardColumn';
import RawData from 'components/StudentDataDashboard/RawData';
import AddGradeDialog from 'components/StudentDataDashboard/AddGradeDialog';
import DeleteGradeDialog from 'components/StudentDataDashboard/DeleteGradeDialog';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PlusIcon from '@material-ui/icons/Add';
import Modal from 'react-modal';

// Function to change css of material-ui HTML components.
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  back: {
    background: '#0097A7',
  },
});

//  variable to set the current date.
const date = new Date();
const year = date.getFullYear();
const day = ('0' + date.getDate()).slice(-2);
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const formattedDate = `${year  }-${  month  }-${  day}`;

/*
* Parent Component for Students Data View.
* This component is the main componet in charge of displaying and rendering the students data.
*   It will display the graph as well as raw numbers dependeing on what the user wants to see.
*
* The components makes the calls to the server to GET, POST, DELETE, or PUT infromation to the database.
* This component also user states, and props to send infromation to its child components.
*
* <Modal> is imported from package react-modal.
* <TextField>, <Button>, <AppBar>, <Tab>, <Tabs>, <PlusIcon> are importer from @material-ui/core.
*   **See https://material-ui.com/ for more information.**
*/
class StudentData extends React.Component {
  // Construstor for states and components.
  constructor(props) {
    super(props);
    this.getStudentDataByID(); // When component first render it calld the function getStudentDataByID().

    // initialize states needed
    this.state = {
      value: 0,
      studentData: [],
      studentID: this.props.match.params.studentID,
      firstName: this.props.match.params.firstName,
      lastName: this.props.match.params.lastName,
      date: formattedDate,
      standard: '',
      open: false,
      radioGrade: '1',
      disabled: true,
      addModalIsOpen: false,
      deleteModalIsOpen: false,
    };
  }

  /*
  * Function in charge of displaying the apporiate view according in which tab is selected.
  * If value = 0, then the component will render the RawData component.
  * If value = 1, then the component will render the Graph component.
  */
  handleChange = (event, value) => {
    this.setState({ value });
  };

  // If the Graph tab is clicked then reset the state variables.
  handleGraphTabClicked = () => {
    this.setState({
      standard: '',
      date: formattedDate,
      disabled: true,
      radioGrade: '1',
    });
  };

  // Function handles when an input is change in an HTML component <TextField>.
  handleChangeStandard = event => {
    this.setState({
      [event.target.name]: event.target.value, // If user types into <TextField>, then get input according to the name of the HTML tag and the value.
      disabled: false,
    });
  };

  // handles the open of the drop down menu
  handleClose = () => {
    this.setState({ open: false });
  };

  // handles the close of the drop down menu
  handleOpen = () => {
    this.setState({ open: true });
  };

  // Function onClick open the Dialog to ADD a NEW Section to the current grade level.
  openAddModal = () => {
    // reset states to default.
    this.setState({
      addModalIsOpen: true,
      standard: '',
      date: formattedDate,
      disabled: true,
      radioGrade: '1',
    });
  };

  // Function onClose close the Dialog to ADD a NEW grade from a current student.
  closeAddModal = () => {
    this.setState({ addModalIsOpen: false });
  };

  // Function onClick open the Dialog to DELETE a grades from a date for a student.
  openDeleteModal = record => {
    // Change state variables of the date to be deleted.
    this.setState({
      deleteModalIsOpen: true,
      date: record,
    });
  };

  // Function onClose close the delete dialog.
  closeDeleteModal = () => {
    this.setState({ deleteModalIsOpen: false });
  };

  // Make API call to server in order to GET the students data.
  getStudentDataByID = () => {
    const currentStudentID = encodeURI(this.props.match.params.studentID); // Determine what is the students data with need based on the students id.
    fetch(`http://localhost:3000/api/assessement/${currentStudentID}`, {// API path send parameter with student's id.
      method: 'GET', // GET request to server
    })
      .then(promise => promise.json()) // Promise recieved from server
      .then(res => {  // get response from the server.
        if (res.length === 0) {
          // if server response is empty, meaning the student has no grade then return 'No Data Available'
          this.setState({ studentData: [{ date: 'No Data Available' }] });
        } else {
          // else change the state of studentData an populated with the section list.
          this.setState({ studentData: res });
        }
      });
  };

  // Make API call to server in order to POST a new grade into the database.
  postNewStudentGrade = e => {
    e.preventDefault();
    this.closeAddModal();
    let grade = this.state.radioGrade;

    if (grade === 'Absent') {
      grade = 'null';
    }

    // Object to be send to server with the new grade.
    const databody = {
      assessementID: null,
      studentID: this.state.studentID,
      standardName: this.state.standard,
      date: this.state.date,
      grade: grade,
    };

    fetch('http://localhost:3000/api/student/assessment/add', {
      // API path
      method: 'POST', // Determine is POST request to server.
      body: JSON.stringify(databody), // Send the Object with the new data.
      headers: {
        'Content-Type': 'application/json',  // Let the server know the object is of type JSON
      },
    })
      .then(res => res.json()) // Get server respone
      .then(data => {
        this.getStudentDataByID(); // Re-render the comoponent with the new data.
      });
  };

  deleteRowGradesByDate = () => {
    console.log('inside delete grades');
    console.log(this.state.date);
    const dateToDelete = this.state.date;
    console.log(dateToDelete);
    this.closeDeleteModal();

    fetch(`http://localhost:3000/api/student/delete/grades/${dateToDelete}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        this.getStudentDataByID();
      });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const { match, location, history } = this.props;

    return (
      <div>
        <div className="section-dashboard">
          <GradeMenu />
          <div className="table-section">
            <AppBar className= {classes.back} position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="RAW DATA" className= {classes.tab} />
                <Tab label="GRAPH" className= {classes.tab} onClick={this.handleGraphTabClicked} />
                <div className= "bar-btns-div">
                  <PlusIcon onClick={this.openAddModal} />
                </div>
              </Tabs>
            </AppBar>
            { value === 0 &&
                <div>
                  <RawData
                    studentID={this.state.studentID}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    studentData={this.state.studentData}
                    openDeleteModal={this.openDeleteModal}
                  />
                </div>
            }
            {value === 1 &&
                <div className='standard-table-container'>
                  <p className="header-student">
                    Student: {this.state.studentID} {this.state.firstName}{' '}
                    {this.state.lastName}
                  </p>
                  <div className="row-graph">
                    <div className="column-graph">
                      <Graph studentData={this.state.studentData} />
                    </div>
                    <div className="column-standards">
                      <AddStandardColumn
                        standard={this.state.standard}
                        open={this.state.open}
                        radioGrade={this.state.radioGrade}
                        disabled={this.state.disabled}
                        date={this.state.date}
                        handleChangeStandard={this.handleChangeStandard}
                        handleClose={this.handleClose}
                        handleOpen={this.handleOpen}
                        postNewStudentGrade={this.postNewStudentGrade}
                      />
                    </div>
                  </div>
                </div>
            }
            <Modal
              className="Modal"
              overlayClassName="Overlay"
              isOpen={this.state.addModalIsOpen}
              onRequestClose={this.closeAddModal}
            >
              <AddGradeDialog
                standard={this.state.standard}
                open={this.state.open}
                closeAddModal={this.closeAddModal}
                date={this.state.date}
                radioGrade={this.state.radioGrade}
                disabled={this.state.disabled}
                handleChangeStandard={this.handleChangeStandard}
                handleClose={this.handleClose}
                handleOpen={this.handleOpen}
                postNewStudentGrade={this.postNewStudentGrade}
              />
            </Modal>

            <Modal
              className="Modal"
              overlayClassName="Overlay"
              isOpen={this.state.deleteModalIsOpen}
              onRequestClose={this.closeDeleteModal}
            >
              <DeleteGradeDialog
                date={this.state.date}
                closeDeleteModal={this.closeDeleteModal}
                deleteRowGradesByDate={this.deleteRowGradesByDate}
              />
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

StudentData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentData);
