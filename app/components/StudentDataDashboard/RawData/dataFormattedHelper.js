/*
* The dataFormattedHelper.js is meant to format the data recieved from the server.
* Students data must be formatted in order to proparley graph the data.
*/

// get the unique dates for each grade in the JSON.
// Dates are repeated in the JSON so its needs to be group each date.
function getUniqueDates(data) {
  const uniqueDates = [];

  data.forEach(day => {
    if (uniqueDates.indexOf(day.date) === -1) {
      // if its unique date then
      uniqueDates.push(day.date); // push the data to the array.
    }
  });

  return uniqueDates; // return array with unique dates.
}

// format the date so it is displayed in the graph x-axis as ex: 2018-11-09
function formatDay(unformattedDate) {
  let formattedDate = 'No Data Available';

  // if there is a date to be formatted then enter if statement.
  if (unformattedDate != 'No Data Available') {
    const date = new Date(unformattedDate);
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    formattedDate = `${year}-${month}-${day}`;
  }

  return formattedDate; // return formated data
}

// This function returns an object where key are the dates.
function getDictionary(data) {
  const dictionary = {}; // initialize object.

  data.forEach(day => {
    // for each unique day
    if (!dictionary[day.date]) {
      dictionary[day.date] = {};
      const formatedDay = formatDay(day.date); // add formated day as key
      dictionary[day.date].date = formatedDay; // add key.
    }

    dictionary[day.date][day.name] = day.grade; // add the values ok each key acccordingly.
  });

  return dictionary; // return object.
}

// function get the keys of the object and adds the values to each key.
// EX: 0: {date: "09/05", Connect: 3, Create: 3, Perform: 2, Respond: 3}
function getGraphData(uniques, dictionary) {
  const graphData = [];

  uniques.forEach(date => {
    graphData.push(dictionary[date]);
  });

  return graphData;
}

// works as a main so the the StudentData can use the formated data.
export const getFormattedData = function(data) {
  const uniques = getUniqueDates(data); // save uniqued date array into variable
  const dictionary = getDictionary(data); // get the dictionary with the dates as keys.
  return getGraphData(uniques, dictionary); // return the final object with the dates, grades, and standard formatted.
};
