import React from 'react';
import PropTypes from 'prop-types';
import styles2 from './styles.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Function to change css of material-ui HTML components.
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: '0px',
    width: 200,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

/*
* Child Component of Sections.
* This componet renders the Add Dialog so the user is able to add a new section.
* Wihtin the dialog there is a form for the user to fill out wit the new information.
* All the changes made by the user in the UI are passed by props to the parent component.
*
* <Select>, <FormControl>, <InputLabel>, <MenuItem>, <FormHelperText>, <TextField>, <Button>
*   are importer from @material-ui/core.
*   **See https://material-ui.com/ for more information.**
*/
class AddSectionDialog extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <h2 className="edit-header">Add Section</h2>
        <p>Please fill out all the fields below.</p>
        <form autoComplete="off">
          <TextField
            required
            id="standard-required"
            label="Name"
            name="name"
            defaultValue={this.props.name}
            margin="normal"
            onChange={this.props.handleInputChange}
            className={classes.textField}
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="term-label">Term</InputLabel>
            <Select
              value={this.props.term}
              onChange={this.props.handleInputChange}
              inputProps={{
                name: 'term',
                id: 'term-label',
              }}
            >
              <MenuItem value="Fall">Fall</MenuItem>
              <MenuItem value="Spring">Spring</MenuItem>
              <MenuItem value="Summer">Summer</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="year-label">Year</InputLabel>
            <Select
              value={this.props.year}
              onChange={this.props.handleInputChange}
              renderValue={value => `${this.props.year}`}
              inputProps={{
                name: 'year',
                id: 'year-label',
              }}
            >
              <MenuItem value="2019">2019</MenuItem>
              <MenuItem value="2018">2018</MenuItem>
              <MenuItem value="2017">2017</MenuItem>
              <MenuItem value="2016">2016</MenuItem>
              <MenuItem value="2015">2015</MenuItem>
            </Select>
          </FormControl>
          <div className="dialog-btn-container">
            <div className="dialog-btn">
              <Button
                onClick={this.props.postNewSectionToServer}
                variant="contained"
                color="primary"
                type="submit"
              >
                > ADD
              </Button>
            </div>
            <div className="dialog-btn">
              <Button onClick={this.props.closeAddModal} variant="contained">
                CANCEL
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

AddSectionDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddSectionDialog);
