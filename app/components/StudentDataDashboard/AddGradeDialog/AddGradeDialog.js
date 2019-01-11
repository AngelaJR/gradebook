import React from 'react';
import PropTypes from 'prop-types';
import styles2 from './styles.css';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

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

class AddGradeDialog extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="standard-label">Standard</InputLabel>
          <Select
            onClose={this.props.handleClose}
            onOpen={this.props.handleOpen}
            value={this.props.standard}
            onChange={this.props.handleChangeStandard}
            inputProps={{
              name: 'standard',
              id: 'standard-label',
            }}
          >
            <MenuItem value="Connect">Connect</MenuItem>
            <MenuItem value="Create">Create</MenuItem>
            <MenuItem value="Perform">Perform</MenuItem>
            <MenuItem value="Respond">Respond</MenuItem>
          </Select>
          <TextField
            disabled={this.props.disabled}
            id="date"
            label="Date"
            type="date"
            name="date"
            onChange={this.props.handleChangeStandard}
            defaultValue={this.props.date}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <RadioGroup
            aria-label="Grade"
            name="radioGrade"
            className={classes.group}
            value={this.props.radioGrade}
            onChange={this.props.handleChangeStandard}
          >
            <FormControlLabel
              value="1"
              disabled={this.props.disabled}
              control={<Radio color="primary" />}
              label="1"
            />
            <FormControlLabel
              value="2"
              disabled={this.props.disabled}
              control={<Radio color="primary" />}
              label="2"
            />
            <FormControlLabel
              value="3"
              disabled={this.props.disabled}
              control={<Radio color="primary" />}
              label="3"
            />
            <FormControlLabel
              value="4"
              disabled={this.props.disabled}
              control={<Radio color="primary" />}
              label="4"
            />
            <FormControlLabel
              value="Absent"
              disabled={this.props.disabled}
              control={<Radio />}
              label="Absent"
            />
          </RadioGroup>
        </FormControl>
        <div className="dialog-btn-container">
          <div className="dialog-btn">
            <Button
              onClick={this.props.postNewStudentGrade}
              disabled={this.props.disabled}
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </div>
          <div className="dialog-btn">
            <Button onClick={this.props.closeAddModal} variant="contained">
              CANCEL
            </Button>
          </div>
        </div>
        <div />
      </form>
    );
  }
}

AddGradeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddGradeDialog);
