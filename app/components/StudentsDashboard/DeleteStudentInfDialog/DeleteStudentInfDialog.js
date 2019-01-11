import React from 'react';
import PropTypes from 'prop-types';
import styles2 from './styles.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

/*
* Child Component of Students.
* This componet renders the Delete Dialog so the user is able to delete a student.
* The dialog will prompt the user to make sure he/she want to delete the student.
* If user decides to delete student then the componet will use props to sent the
*    parent component the student's id to be deleted from database.
*
* <Select>, <FormControl>, <InputLabel>, <MenuItem>, <FormHelperText>, <TextField>, <Button>
*   are importer from @material-ui/core.
*   **See https://material-ui.com/ for more information.**
*/
class DeleteStudentInfDialog extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <h2>
          Are you sure you want to delete the student {this.props.firstName}{' '}
          {this.props.lastName}?
        </h2>
        <p>
          Once you delete the student, their information cannot be recovered!
        </p>
        <br />
        <div className="dialog-btn">
          <Button
            onClick={this.props.deleteStudent}
            variant="contained"
            color="secondary"
          >
            DELETE
          </Button>
        </div>
        <div className="dialog-btn">
          <Button onClick={this.props.closeModal} variant="contained">
            CANCEL
          </Button>
        </div>
      </div>
    );
  }
}

DeleteStudentInfDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteStudentInfDialog);
