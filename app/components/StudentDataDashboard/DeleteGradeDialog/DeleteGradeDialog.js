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

class DeleteGradeDialog extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <h2>
          Are you sure you want to delete all the grades from date{' '}
          {this.props.date}?
        </h2>
        <p>
          Once you delete this row, all the grades from date {this.props.date}{' '}
          will be lost!
        </p>
        <br />
        <div className="dialog-btn">
          <Button
            onClick={this.props.deleteRowGradesByDate}
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

DeleteGradeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteGradeDialog);
