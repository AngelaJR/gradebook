import React from 'react';
import styles2 from './styles.css';
import SectionsMenu from 'components/SectionsMenu';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PlusIcon from '@material-ui/icons/Add';

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

class StudentsToolbar extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.back} position="static">
          <Toolbar>
            <SectionsMenu />
            <div className="bar-btns-div2">
              <PlusIcon onClick={this.props.handleClickOpen} />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(StudentsToolbar);
