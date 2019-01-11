import React from 'react';
import styles2 from './styles.css';
import SectionsData from 'components/SectionsDashboard/SectionsData';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PlusIcon from '@material-ui/icons/Add';
import AddSectionDialog from 'components/SectionsDashboard/AddSectionDialog';

// Function to change css of material-ui HTML components.
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  back: {
    background: '#0097A7',
  },
  tab: {
    fontSize: 14,
  },
});

/*
* Child Component of Sections.
* This componet renders the top bar for the Section Dialog.
* The top bar allows the user to pick between Current and Archived Section
* If user decides to delete section then the componet will use props to sent the
*    parent component the sectionID to be deleted from database.
*
* <AppBar>, <Tabs>, <Tab>, <PlusIcon> are importer from @material-ui/core.
*   **See https://material-ui.com/ for more information.**
*/
class SectionTabs extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.back} position="static">
          <Tabs value={this.props.value} onChange={this.props.handleTabChange}>
            <Tab label="CURRENT" className={classes.tab} />
            <Tab label="ARCHIVE" className={classes.tab} />
            <div className="bar-btns-div">
              <PlusIcon onClick={this.props.openAddModal} />
            </div>
          </Tabs>
        </AppBar>
        {this.props.value === 0 && (
          <SectionsData
            sectionList={this.props.sectionList}
            gradeLevel={this.props.gradeLevel}
            deleteSection={this.props.deleteSection}
            openDeleteModal={this.props.openDeleteModal}
            openModalEdit={this.props.openModalEdit}
          />
        )}
        {this.props.value === 1 && (
          <SectionsData
            sectionList={this.props.sectionList}
            gradeLevel={this.props.gradeLevel}
            deleteSection={this.props.deleteSection}
            openDeleteModal={this.props.openDeleteModal}
            openModalEdit={this.props.openModalEdit}
          />
        )}
      </div>
    );
  }
}

SectionTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SectionTabs);
