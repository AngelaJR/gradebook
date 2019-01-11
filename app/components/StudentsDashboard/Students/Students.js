import React from 'react';
import styles2 from './styles.css';
import GradeMenu from 'components/GradeMenu';
import StudentsToolbar from 'components/StudentsDashboard/StudentsToolbar';
import StudentsTable from 'components/StudentsDashboard/StudentsTable';
import AddStudentsDialog from 'components/StudentsDashboard/AddStudentsDialog';
import EditStudentInfDialog from 'components/StudentsDashboard/EditStudentInfDialog';
import DeleteStudentInfDialog from 'components/StudentsDashboard/DeleteStudentInfDialog';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

// Function to change css of material-ui HTML components.
const styles = theme => ({
  button: {
    margin: '24px 10px 10px 10px',
    borderColor: '#0097A7',
    color: '#0097A7',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: '0px',
    width: 200,
  },
});

/*
* Parent Component for Students List View.
* This component is the main componet in charge of displaying and rendering the Students View.
*
* The components makes the calls to the server to GET, POST, DELETE, or PUT infromation to the database.
* This component also user states, and props to send infromation to its child components.
*
* <Modal> is imported from package react-modal.
* <TextField>, <Button> are importer from @material-ui/core.
*   **See https://material-ui.com/ for more information.**
*/
class Students extends React.PureComponent {
  // Construstor for states and components.
  constructor(props) {
    super(props);
    this.getStudentsData(); // When component first render it calld the function getStudentsData().

    // initialize states needed
    this.state = {
      studentsList: [],
      gradeLevel: this.props.match.params.gradeLevel,
      sectionName: this.props.match.params.sectionName,
      sectionID: this.props.match.params.sectionID,
      studentIDToDelete: '',
      studentIDToEdit: '',
      open: false,
      modalIsOpen: false,
      modalEditIsOpen: false,
      firstName: '',
      lastName: '',
    };
  }

  // When comoponent mounts render component Modal for dialogs
  componentWillMount() {
    Modal.setAppElement('body');
  }

  // Function handles when an input is change in an HTML component <TextField>.
  handleInputChange = e => {
    // If user types into <TextField>, then get input according to the name of the HTML tag and the value.
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Function onClick open the Dialog to ADD a NEW Student to the current section.
  handleClickOpen = () => {
    // reset states to default.
    this.setState({
      open: true,
      firstName: '',
      lastName: '',
    });
  };

  // Function onClose close the Dialog to ADD a NEW Student to the current section.
  handleClose = () => {
    this.setState({ open: false });
  };

  // Function onClick open the Dialog to DELETE a current studen based on user's input.
  openModal = record => {
    // Change state variables of sectionID and name in order to know what section needs to be deleted from database.
    this.setState({
      modalIsOpen: true,
      studentIDToDelete: record.id,
      firstName: record.first,
      lastName: record.last,
    });
  };

  // Function onClose close the Dialog to DELETE a current student based users input.
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  // Function onClick open the Dialog to EDIT a current student based on user input.
  openModalEdit = record => {
    // Change state variables of studentID, first name, last name accroding to user's input
    //  in order for the application to know what student is being eddited the student's ID is used.
    this.setState({
      modalEditIsOpen: true,
      studentIDToEdit: record.id,
      firstName: record.first,
      lastName: record.last,
    });
  };

  // Function onClose close the Dialog to EDIT a current student.
  closeModalEdit = () => {
    this.setState({ modalEditIsOpen: false });
  };

  // Make API call to server in order to GET the student's list according to the current section.
  getStudentsData = () => {
    const gradeLevel = encodeURI(this.props.match.params.gradeLevel); // Determine what is the current grade level.
    const currentSection = encodeURI(this.props.match.params.sectionID); // Determine what is the current sectionID.

    fetch(
      `http://localhost:3000/api/students/${gradeLevel}/${currentSection}`, // API path to server sending the grade leve, and section id as parameters.
      {
        method: 'GET', // GET request to server
      },
    )
      .then(promise => promise.json()) // Promise recieved from server
      .then(res => {
        // get response from the server.
        // if server response is empty, meaning the current section has no students then return 'No Data Available'
        if (res.length === 0) {
          this.setState({ studentsList: [{ first: 'No Data Available' }] });
        } else {
          // else change the state of studentsList a populated with the students list.
          this.setState({ studentsList: res });
        }
      });
  };

  // Make API call to server in order to DELETE a student from the database.
  deleteStudent = () => {
    const studentIDToDelete = this.state.studentIDToDelete; // determine which student need to be deleted according to the student's id.
    this.closeModal(); // close the delete dialog.

    // If there is a student to delete then make API call
    if (studentIDToDelete != '') {
      fetch(`http://localhost:3000/api/student/delete/${studentIDToDelete}`, {
        // API path sends parameter with the studen id to be deleted.
        method: 'DELETE', // Determine is DELETE request to server.
      })
        .then(res => res.json()) // get response.
        .then(data => {
          this.getStudentsData(); // re-render the component with the edited student list.
        });
    }
  };

  // Make API call to server in order to POST a new student into the database.
  postNewStudentToDatabase = e => {
    e.preventDefault();

    // Object to be seent to server with the new data to add a new student.
    const databody = {
      studentID: null,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      sectionID: this.state.sectionID,
    };

    fetch('http://localhost:3000/api/student/add', {
      // API path to communicate with server.
      method: 'POST', // Determine is POST request to server.
      body: JSON.stringify(databody), // Send the Object with the new data.
      headers: {
        'Content-Type': 'application/json', // Let the server know the object is of type JSON
      },
    })
      .then(res => res.json()) // Get server respone
      .then(data => {
        this.getStudentsData(); // re-render the component with the edited student list.
      });
  };

  // Make API call to server in order to EDIT a student's data in the database.
  putStudentInfToServer = e => {
    e.preventDefault();
    this.closeModalEdit();

    // Object to be sent to server with the new data for an edited student.
    const databody = {
      studentID: this.state.studentIDToEdit,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };

    fetch('http://localhost:3000/api/student/edit', {
      // API path to communicate with server.
      method: 'PUT', // Determine is a PUT request for server.
      body: JSON.stringify(databody), // Send the Object with the new data.
      headers: {
        'Content-Type': 'application/json', // Let the server know the object is of type JSON
      },
    })
      .then(res => res.json()) // get response from server
      .then(data => {
        this.getStudentsData(); // re-render the component with the edited student list.
      });
  };

  // Render Student List View
  render() {
    const { classes } = this.props;

    return (
      <div className="section-dashboard">
        <GradeMenu />
        <div className="table-section">
          <StudentsToolbar
            handleClickOpen={this.handleClickOpen}
            handleTabChange={this.handleTabChange}
          />
          <StudentsTable
            studentsList={this.state.studentsList}
            openModal={this.openModal}
            openModalEdit={this.openModalEdit}
          />
          <AddStudentsDialog
            open={this.state.open}
            handleClose={this.handleClose}
            handleInputChange={this.handleInputChange}
            postNewStudentToDatabase={this.postNewStudentToDatabase}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
          />
          <Modal
            className="Modal"
            overlayClassName="Overlay"
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
          >
            <DeleteStudentInfDialog
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              deleteStudent={this.deleteStudent}
              closeModal={this.closeModal}
            />
          </Modal>

          <Modal
            className="Modal"
            overlayClassName="Overlay"
            isOpen={this.state.modalEditIsOpen}
            onRequestClose={this.closeModalEdit}
          >
            <EditStudentInfDialog
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              closeModalEdit={this.closeModalEdit}
              putStudentInfToServer={this.putStudentInfToServer}
              handleInputChange={this.handleInputChange}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Students);
