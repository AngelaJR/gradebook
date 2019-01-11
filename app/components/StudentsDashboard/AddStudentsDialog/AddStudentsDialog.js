import React from 'react';
import Fragment from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PlusIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

// Function to change css of material-ui HTML components.
const styles = theme => ({
  button: {
    margin: '24px 10px 10px 10px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

/*
* Child Component of Students.
* This componet renders the Add Dialog so the user is able to add a new student.
* Wihtin the dialog there is a form for the user to fill out wit the new information.
* All the changes made by the user in the UI are passed by props to the parent component.
*
* <Select>, <FormControl>, <InputLabel>, <MenuItem>, <FormHelperText>, <TextField>, <Button>
*   are importer from @material-ui/core.
*   **See https://material-ui.com/ for more information.**
*/
class AddStudentsDialog extends React.PureComponent {
  handleClose = () => {
    this.props.handleClose();
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          maxWidth="false"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Student</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill the form below to add a new Student.
            </DialogContentText>
            <form onSubmit={this.props.postNewStudentToDatabase}>
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
              <div>
                <Button
                  onClick={this.handleClose}
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Add
                </Button>
              </div>
            </form>
          </DialogContent>
          <DialogActions />
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(AddStudentsDialog);
