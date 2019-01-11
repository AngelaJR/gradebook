SELECT * FROM sections ORDER BY name, year

SELECT students.studentID, concat(students.firstName, ' ', students.lastName) AS 'Students',
sections.name AS Section
FROM students JOIN sections USING(sectionID)
WHERE name = 'Section A'
ORDER BY firstName

-- get section archive
SELECT sections.name, sections.term, sections.year
FROM gradeLevel JOIN sections USING(levelID)
WHERE gradeLevel.name = '1st Grade' AND NOT sections.year = 2018
ORDER BY year DESC, term, name

-- get sections current
SELECT sections.name, sections.term, sections.year
FROM gradeLevel JOIN sections USING(levelID)
WHERE gradeLevel.name = '1st Grade' AND sections.year = 2018 AND sections.term = 'Spring'
ORDER BY year DESC, term, name

-- get students by grade level and section
SELECT students.studentID, students.firstName, students.lastName
FROM gradeLevel JOIN sections USING(levelID)
JOIN students USING(sectionID)
WHERE gradeLevel.name = '1st Grade'
AND sections.name = 'Section A'
ORDER BY  students.lastName, students.firstName

-- How many students in a section
SELECT COUNT(*)
FROM students JOIN sections USING(sectionID)
WHERE name = 'Section A'

--Students Grades
SELECT assessment.date, standard.name, assessment.grade
FROM assessment JOIN standard USING(standardID)
JOIN students USING(studentID)
WHERE students.studentID = '1246'
ORDER BY assessment.date, standard.name


--Insert section
INSERT INTO sections(sectionID, name, term, year, levelID)
SELECT null, 'Section A', 'Fall', 2018, levelID
FROM gradeLevel levelID
where levelID.name = '3rd Grade'
