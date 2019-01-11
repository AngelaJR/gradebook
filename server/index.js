/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();
const mysql = require('mysql');

const queryHelper = require('./util/queryHelper');

// First you need to create a connection to the db
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'gradebook',
  port: '8889',
});

const bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

// middleware to use for all requests
router.use((req, res, next) => {
  // do logging
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// get studets table by grade level and section from database
router.route('/students/:gradeLevel/:currentSection').get((req, res) => {
  con.query(
    queryHelper.getStudentsBySection(
      req.params.gradeLevel,
      req.params.currentSection,
    ),
    (err, rows) => {
      if (err) throw err;

      const studentsList = rows.map(row => ({
        id: row.studentID,
        first: row.firstName,
        last: row.lastName,
        section: row.sectionID,
      }));

      res.json(studentsList);
    },
  );
});

// get sections table from database
router.route('/sections/:sectionData/:gradeLevel').get((req, res) => {
  con.query(
    queryHelper.getQueryByTimeOfYear(
      req.params.sectionData,
      req.params.gradeLevel,
    ),
    (err, rows) => {
      if (err) throw err;

      const sectionList = rows.map(row => ({
        sectionID: row.sectionID,
        name: row.name,
        term: row.term,
        year: row.year,
      }));

      res.json(sectionList);
    },
  );
});

// get a student's grades
router.route('/assessement/:studentID').get((req, res) => {
  con.query(
    queryHelper.getStudentDataByStudentID(req.params.studentID),
    (err, rows) => {
      if (err) throw err;

      const studentData = rows.map(row => ({
        date: row.date,
        name: row.name,
        grade: row.grade,
      }));

      res.json(studentData);
    },
  );
});

// get standard table from database
router.route('/standard').get((req, res) => {
  con.query('SELECT name FROM standard ORDER BY name ASC', (err, rows) => {
    if (err) throw err;

    const standardList = rows.map(row => ({ standard: row.name }));

    res.json(standardList);
  });
});

// insert section into database
router.route('/sections/add').post((req, res) => {
  const postData = req.body;
  con.query(queryHelper.postInsertNewSection(req.body), (err, res) => {
    if (err) throw err;

    console.log(`${res.affectedRows} Row(s) Inserted`);
  });

  res.json({ msg: 'Row(s) Inserted Successfully.' });
});

// add a new grade into a student's data into database
router.route('/student/assessment/add').post((req, res) => {
  const postData = req.body;
  console.log(req.body);
  con.query(queryHelper.postInsertNewStudentGrade(req.body), (err, res) => {
    if (err) throw err;

    console.log(`${res.affectedRows} Row(s) Inserted`);
  });

  res.json({ msg: 'Row(s) Inserted Successfully.' });
});

// add a new student into database
router.route('/student/add').post((req, res) => {
  const postData = req.body;
  con.query(queryHelper.postInsertNewStudent(req.body), (err, res) => {
    if (err) throw err;

    console.log(`${res.affectedRows} Row(s) Inserted`);
  });

  res.json({ msg: 'Row(s) Inserted Successfully.' });
});

// edit section in database
router.route('/sections/edit').put((req, res) => {
  const postData = req.body;
  console.log(req.body);
  con.query(queryHelper.putSectionData(req.body), (err, res) => {
    if (err) throw err;

    console.log(`${res.affectedRows} Row(s) Edited`);
  });

  res.json({ msg: 'Row(s) Edited Successfully.' });
});

// edit student info in database
router.route('/student/edit').put((req, res) => {
  const postData = req.body;
  console.log(req.body);
  con.query(queryHelper.putStudentInfData(req.body), (err, res) => {
    if (err) throw err;

    console.log(`${res.affectedRows} Row(s) Edited`);
  });

  res.json({ msg: 'Row(s) Edited Successfully.' });
});

// delete section from database
router.route('/section/delete/:sectionID').delete((req, res) => {
  con.query(queryHelper.deleteSectionData(req.params.sectionID), (err, res) => {
    if (err) throw err;

    console.log(`${res.affectedRows} Row(s) Deleted`);
  });

  res.json({ msg: 'Row(s) Deleted Successfully.' });
});

// delete student from database
router.route('/student/delete/:studentID').delete((req, res) => {
  con.query(queryHelper.deleteStudentData(req.params.studentID), (err, res) => {
    if (err) throw err;

    console.log(`${res.affectedRows} Row(s) Deleted`);
  });

  res.json({ msg: 'Row(s) Deleted Successfully.' });
});

// delete student's grades by date from database
router.route('/student/delete/grades/:date').delete((req, res) => {
  con.query(queryHelper.deleteGradesByDate(req.params.date), (err, res) => {
    if (err) throw err;

    console.log(`${res.affectedRows} Row(s) Deleted`);
  });

  res.json({ msg: 'Row(s) Deleted Successfully.' });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
