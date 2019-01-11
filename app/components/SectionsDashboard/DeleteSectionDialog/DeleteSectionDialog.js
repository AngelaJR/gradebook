import React from 'react';
import PropTypes from 'prop-types';
import styles2 from './styles.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Function to change css of material-ui HTML components.
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
* Child Component of Sections.
* This componet renders the Delete Dialog so the user is able to delete a section.
* The dialog will prompt the user to make sure he/she want to delete the section.
* If user decides to delete section then the componet will use props to sent the
*    parent component the sectionID to be deleted from database.
*
* <Select>, <FormControl>, <InputLabel>, <MenuItem>, <FormHelperText>, <TextField>, <Button>
*   are importer from @material-ui/core.
*   **See https://material-ui.com/ for more information.**
*/
class DeleteSectionDialog extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <h2>Are you sure you want to delete this {this.props.name}?</h2>
        <p>
          Once you delete it, all the information stored {this.props.name} in
          will be gone forever!
        </p>
        <br />
        <div className="dialog-btn">
          <Button
            onClick={this.props.deleteSection}
            variant="contained"
            color="secondary"
          >
            DELETE
          </Button>
        </div>
        <div className="dialog-btn">
          <Button onClick={this.props.closeDeleteModal} variant="contained">
            CANCEL
          </Button>
        </div>
      </div>
    );
  }
}

DeleteSectionDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteSectionDialog);
