import React from 'react';
import PropTypes from 'prop-types';
import styles2 from './styles.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// Function to change css of material-ui HTML components.
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: '0px',
    width: 200,
  },
});

/*
* Child Component of Students.
* This componet renders the Edit Dialog so the user is able to edit a students information.
* Within the dialog there is a form for the user to fill out so the changes can be made.
* All the changes made by the user in the UI are passed by props to the parent component.
*
* <Select>, <FormControl>, <InputLabel>, <MenuItem>, <FormHelperText>, <TextField>, <Button>
*   are importer from @material-ui/core.
*   **See https://material-ui.com/ for more information.**
*/
class EditStudentInfDialog extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <h2 className="edit-header">Edit Student</h2>
        <form onSubmit={this.props.putStudentInfToServer}>
          <TextField
            required
            id="standard-required"
            label="First name"
            name="firstName"
            defaultValue={this.props.firstName}
            margin="normal"
            onChange={this.props.handleInputChange}
            className={classes.textField}
          />
          <TextField
            required
            id="standard-required"
            label="Last Name"
            name="lastName"
            defaultValue={this.props.lastName}
            margin="normal"
            onChange={this.props.handleInputChange}
            className={classes.textField}
          />
          <div className="dialog-btn-container">
            <div className="dialog-btn">
              <Button variant="contained" color="secondary" type="submit">
                EDIT
              </Button>
            </div>
            <div className="dialog-btn">
              <Button onClick={this.props.closeModalEdit} variant="contained">
                CANCEL
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

EditStudentInfDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditStudentInfDialog);
