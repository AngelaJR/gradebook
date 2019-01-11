// returns current year
const getCurrentYear = function() {
  const dt = new Date();
  return dt.getFullYear();
};

/*
  Returns current term/semester
  Definicion of Terms are as follow:
    if 17 September 2018 to 14 December 2018 - > fall
    if 7 January 2019 to 5 April 2019 -> Spring
    if 15 April 2019 to 31 May 2019 -> summer
*/
const getCurrentSemester = function() {
  const currentDate = new Date().getTime();
  const springStartMs = new Date('01/07/2018').getTime();
  const springEndMs = new Date('05/05/2018').getTime();
  const summerStartMs = new Date('04/15/2018').getTime();
  const summerEndMs = new Date('05/31/2018').getTime();
  let term = 'Fall';

  if (currentDate >= springStartMs && currentDate <= springEndMs) {
    term = 'Spring';
  } else if (currentDate >= summerStartMs && currentDate <= summerEndMs) {
    term = 'Summer';
  }

  return term;
};

const getArchiveSectionsByGradeLevel = function(gradeLevel) {
  return `SELECT sections.sectionID, sections.name, sections.term, sections.year
    FROM gradeLevel JOIN sections USING(levelID)
    WHERE gradeLevel.name = '${gradeLevel}'
    AND NOT (sections.term = '${getCurrentSemester()}' AND sections.year = ${getCurrentYear()})
    ORDER BY year DESC, term, name`;
};

const getCurrentSectionsByGradeLevel = function(gradeLevel) {
  return `SELECT sections.sectionID, sections.name, sections.term, sections.year
    FROM gradeLevel JOIN sections USING(levelID)
    WHERE gradeLevel.name = '${gradeLevel}'
    AND sections.year = ${getCurrentYear()}
    AND sections.term = '${getCurrentSemester()}'
    ORDER BY year DESC, term, name`;
};

exports.getStudentsBySection = function(gradeLevel, section) {
  return `SELECT students.studentID, students.firstName, students.lastName
    FROM gradeLevel JOIN sections USING(levelID)
    JOIN students USING(sectionID)
    WHERE gradeLevel.name = '${gradeLevel}'
    AND sections.sectionID = '${section}'
    ORDER BY  students.lastName, students.firstName`;
};

exports.getStudentDataByStudentID = function(studentID) {
  return `SELECT assessment.date, standard.name, assessment.grade
    FROM assessment JOIN standard USING(standardID)
    JOIN students USING(studentID)
    WHERE students.studentID = '${studentID}'
    ORDER BY assessment.date, standard.name`;
};

// returns correct query either current or archive
exports.getQueryByTimeOfYear = function(sectionData, gradeLevel) {
  let queryStr = getCurrentSectionsByGradeLevel(gradeLevel);
  if (sectionData === 'archive') {
    queryStr = getArchiveSectionsByGradeLevel(gradeLevel);
  }
  return queryStr;
};

// // returns correct query either current or archive
// exports.postNewSection = function() {
//   return `INSERT INTO sections(sectionID, name, term, year, levelID)
//     VALUES (null,'Section F','Fall',2018,0)`;
// };

exports.postInsertNewSection = function(data) {
  return `INSERT INTO sections (sectionID, name, term, year, levelID)
    SELECT ${data.sectionID}, '${data.name}', '${data.term}', ${
  data.year
} , levelID
    FROM gradeLevel levelID
    WHERE levelID.name = '${data.levelID}'`;
};

exports.postInsertNewStudent = function(data) {
  return `INSERT INTO students (studentID, firstName, lastName, sectionID)
    VALUES (${data.studentID}, '${data.firstName}', '${data.lastName}', ${
  data.sectionID
})`;
};

exports.postInsertNewStudentGrade = function(data) {
  return `INSERT INTO assessment (assessementID, studentID, standardID, date, grade)
  SELECT ${data.assessementID}, ${data.studentID}, standardID, '${
  data.date
}', ${data.grade}
  FROM standard standardID
  WHERE standardID.name = '${data.standardName}'`;
};

exports.putSectionData = function(data) {
  return `UPDATE sections
    SET name = '${data.name}',
        term = '${data.term}',
        year = ${data.year}
    WHERE sectionID = ${data.sectionID}`;
};

exports.putStudentInfData = function(data) {
  return `UPDATE students
    SET firstName = '${data.firstName}',
        lastName  = '${data.lastName}'
    WHERE studentID = ${data.studentID}`;
};

exports.deleteSectionData = function(sectionID) {
  return `DELETE FROM sections WHERE sectionID = ${sectionID}`;
};

exports.deleteStudentData = function(studentID) {
  return `DELETE FROM students WHERE students.studentID = ${studentID}`;
};

exports.deleteGradesByDate = function(date) {
  return `DELETE FROM assessment WHERE date = '${date}'`;
};
