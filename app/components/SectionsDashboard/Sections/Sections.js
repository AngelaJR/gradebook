import React from 'react';
import Modal from 'react-modal';
import styles2 from './styles.css';
import GradeMenu from 'components/GradeMenu';
import SectionsTopBar from 'components/SectionsDashboard/SectionsTopBar';
import AddSectionDialog from 'components/SectionsDashboard/AddSectionDialog';
import DeleteSectionDialog from 'components/SectionsDashboard/DeleteSectionDialog';
import EditSectionDialog from 'components/SectionsDashboard/EditSectionDialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
    width: 200,
  },
});

/*
* Parent Component for Section List View.
* This component is the main componet in charge of displaying and rendering the Sections View.
*
* The components makes the calls to the server to GET, POST, DELETE, or PUT infromation to the database.
* This component also user states, and props to send infromation to its child components.
*
* <Modal> is imported from package react-modal.
* <TextField>, <Button> are importer from @material-ui/core.
*   **See https://material-ui.com/ for more information.**
*/
class Sections extends React.PureComponent {
  // Construstor for states and components.
  constructor(props) {
    super(props);
    this.getCurrentSectionsData(); // When component first render it calld the function getCurrentSectionsData().

    // initialize states needed
    this.state = {
      value: 0,
      sectionList: [],
      gradeLevel: this.props.match.params.gradeLevel,
      open: false,
      modalIsOpen: false,
      modalEditIsOpen: false,
      name: '',
      term: '',
      year: new Date().getFullYear(),
      sectionIDToDelete: '',
      sectionIDToEdit: '',
      sectionID: '',
    };
  }

  // When comoponent mounts render component Modal for dialogs
  componentWillMount() {
    Modal.setAppElement('body');
  }

  /*
   * Function in charge of displaying the apporiate list according in which tab is clicked.
   * The Sections List Current or Archive is determined in the server side,
   *   but the application takes into accoun the current date.
   *   According to the date the application knows if its Fall, Spring, or Winter Term.
   *
   * If value = 0, then the component need to render the Current sections.
   * If value = 1, then the component need to render the Archive sections.
   */
  handleTabChange = (event, value) => {
    this.setState({ value });
    const sec =
      value === 0
        ? this.getCurrentSectionsData()
        : this.getArchivedSectionsData();
  };

  // Function onClick open the Dialog to ADD a NEW Section to the current grade level.
  openAddModal = () => {
    // reset states to default.
    this.setState({
      open: true,
      name: '',
      term: '',
      year: new Date().getFullYear(),
    });
  };

  // Function onClose close the Dialog to ADD a NEW Section to the current grade level.
  closeAddModal = () => {
    this.setState({ open: false });
  };

  // Function handles when an input is change in an HTML component <TextField>.
  handleInputChange = e => {
    // If user types into <TextField>, then get input according to the name of the HTML tag and the value.
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Function onClick open the Dialog to DELETE a current section based on the current grade level.
  openDeleteModal = record => {
    // Change state variables of sectionID and name in order to know what section needs to be deleted from database.
    this.setState({
      modalIsOpen: true,
      sectionID: record.sectionID,
      name: record.name,
    });
  };

  // Function onClose close the Dialog to DELETE a current section based on the current grade level.
  closeDeleteModal = () => {
    this.setState({ modalIsOpen: false });
  };

  // Function onClick open the Dialog to EDIT a current section based on the current grade level.
  openModalEdit = record => {
    // Change state variables of sectionID, name, term, year accroding to user's input
    //  in order for the application to know what section is being eddited and what is being changed.
    this.setState({
      modalEditIsOpen: true,
      sectionID: record.sectionID,
      name: record.name,
      term: record.term,
      year: record.year,
    });
  };

  // Function onClose close the Dialog to EDIT a current section based on the current grade level.
  closeModalEdit = () => {
    this.setState({ modalEditIsOpen: false });
  };

  // Make API call to server in order to GET the CURRENT setions list according to the current grade level.
  getCurrentSectionsData = () => {
    const gradeLevel = encodeURI(this.props.match.params.gradeLevel); // Determine what is the current grade level.
    fetch(`http://localhost:3000/api/sections/current/${gradeLevel}`, {
      // API path when the section is CURRENT Section
      method: 'GET', // GET request to server
    })
      .then(promise => promise.json()) // Promise recieved from server
      .then(res => {
        // get response from the server.
        if (res.length === 0) {
          // if server response is empty, meaning the current grade level has not sections then return 'No Data Available'
          this.setState({
            sectionList: [{ term: 'No Data Available' }],
          });
        } else {
          // else change the state of sectionList a populated with the section list.
          this.setState({ sectionList: res });
        }
      });
  };

  // Make API call to server in order to GET the ARCHIVED setions list according to the current grade level.
  getArchivedSectionsData = () => {
    const gradeLevel = encodeURI(this.props.match.params.gradeLevel); // Determine what is the current grade level.
    fetch(`http://localhost:3000/api/sections/archive/${gradeLevel}`, {
      // API path when the section is ARCHIVED Section
      method: 'GET', // GET request to server
    })
      .then(promise => promise.json()) // Promise recieved from server
      .then(res => {
        // get response from the server.
        if (res.length === 0) {
          // if server response is empty, meaning the current grade level has not sections then return 'No Data Available'
          this.setState({
            sectionList: [{ term: 'No Data Available' }],
          });
        } else {
          // else change the state of sectionList a populated with the section list.
          this.setState({ sectionList: res });
        }
      });
  };

  // Make API call to server in order to POST a new setion into the database.
  postNewSectionToServer = e => {
    e.preventDefault();
    this.closeAddModal();

    // Object to be seent to server with the new data to add a new section.
    const databody = {
      sectionID: null,
      name: this.state.name,
      term: this.state.term,
      year: parseInt(this.state.year),
      levelID: this.props.match.params.gradeLevel,
    };

    fetch('http://localhost:3000/api/sections/add', {
      // API path to communicate with server.
      method: 'POST', // Determine is POST request to server.
      body: JSON.stringify(databody), // Send the Object with the new data.
      headers: {
        'Content-Type': 'application/json', // Let the server know the object is of type JSON
      },
    })
      .then(res => res.json()) // Get server respone
      .then(data => {
        // Once the section is edited then re-render the component.
        // determine which current tab the view is in.
        if (this.state.value === 0) {
          this.getCurrentSectionsData(); // if is Current then Current Section List
        } else {
          this.getArchivedSectionsData(); // else get Archive Section List
        }
      });
  };

  // Make API call to server in order to DELETE a setion from the database.
  deleteSection = () => {
    const sectionIDToDelete = this.state.sectionID; // determine which section need to be deleted according to the sectionID
    this.closeDeleteModal(); // close the delete dialog.

    // If there is a section to delete then make API call
    if (sectionIDToDelete != '') {
      fetch(`http://localhost:3000/api/section/delete/${sectionIDToDelete}`, {
        // API path to comuncate with derver to delete section accroding to sectionID
        method: 'DELETE', // Determine is DELETE request to server.
      })
        .then(res => res.json()) // get response
        .then(data => {
          // Once the section is edited then re-render the component.
          // determine which current tab the view is in.
          if (this.state.value === 0) {
            this.getCurrentSectionsData(); // if is Current then Current Section List
          } else {
            this.getArchivedSectionsData(); // else get Archive Section List
          }
        });
    }
  };

  // Make API call to server in order to EDIT a setion in the database.
  putSectionToServer = e => {
    e.preventDefault();
    this.closeModalEdit();

    // Object to be sent to server with the new data for an edited section.
    const databody = {
      sectionID: this.state.sectionID,
      name: this.state.name,
      term: this.state.term,
      year: parseInt(this.state.year),
    };

    fetch('http://localhost:3000/api/sections/edit', {
      // API path to communicate with server.
      method: 'PUT', // Determine is a PUT request for server.
      body: JSON.stringify(databody), // Send the Object with the new data.
      headers: {
        'Content-Type': 'application/json', // Let the server know the object is of type JSON
      },
    })
      .then(res => res.json()) // get response from server
      .then(data => {
        // Once the section is edited then re-render the component.
        // determine which current tab the view is in.
        if (this.state.value === 0) {
          this.getCurrentSectionsData(); // if is Current then Current Section List
        } else {
          this.getArchivedSectionsData(); // else get Archive Section List
        }
      });
  };

  // Render Section List View
  render() {
    const { classes } = this.props;

    return (
      <div className="section-dashboard">
        <GradeMenu />
        <div className="table-section">
          <SectionsTopBar
            sectionList={this.state.sectionList}
            value={this.state.value}
            gradeLevel={this.state.gradeLevel}
            postNewSectionToServer={this.postNewSectionToServer}
            deleteSection={this.deleteSection}
            openDeleteModal={this.openDeleteModal}
            openModalEdit={this.openModalEdit}
            openAddModal={this.openAddModal}
            handleClickOpenDelete={this.handleClickOpenDelete}
            handleTabChange={this.handleTabChange}
          />
          <Modal
            className="Modal"
            overlayClassName="Overlay"
            isOpen={this.state.open}
            onRequestClose={this.closeAddModal}
          >
            <AddSectionDialog
              name={this.state.name}
              term={this.state.term}
              year={this.state.year}
              closeAddModal={this.closeAddModal}
              handleInputChange={this.handleInputChange}
              postNewSectionToServer={this.postNewSectionToServer}
            />
          </Modal>

          <Modal
            className="Modal"
            overlayClassName="Overlay"
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeDeleteModal}
          >
            <DeleteSectionDialog
              name={this.state.name}
              deleteSection={this.deleteSection}
              closeDeleteModal={this.closeDeleteModal}
            />
          </Modal>

          <Modal
            className="Modal"
            overlayClassName="Overlay"
            isOpen={this.state.modalEditIsOpen}
            onRequestClose={this.closeModalEdit}
          >
            <EditSectionDialog
              name={this.state.name}
              term={this.state.term}
              year={this.state.year}
              closeModalEdit={this.closeModalEdit}
              handleInputChange={this.handleInputChange}
              putSectionToServer={this.putSectionToServer}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Sections);
