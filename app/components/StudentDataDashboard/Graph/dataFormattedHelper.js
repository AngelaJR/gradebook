function getUniqueDates(data) {
  const uniqueDates = [];

  data.forEach(day => {
    if (uniqueDates.indexOf(day.date) === -1) {
      uniqueDates.push(day.date);
    }
  });

  return uniqueDates;
}

function formatDay(unformattedDay) {
  let formattedDay = 'No Data Available';

  if (unformattedDay != 'No Data Available') {
    const time = new Date(unformattedDay);
    const day = `0${time.getDate()}`.slice(-2);
    const month = `0${time.getMonth() + 1}`.slice(-2);
    formattedDay = `${month}/${day}`;
  }

  return formattedDay;
}

function getDictionary(data) {
  const dictionary = {};

  data.forEach(day => {
    if (!dictionary[day.date]) {
      dictionary[day.date] = {};
      const formatedDay = formatDay(day.date);
      dictionary[day.date].date = formatedDay;
    }

    dictionary[day.date][day.name] = day.grade;
  });

  return dictionary;
}

function getGraphData(uniques, dictionary) {
  const graphData = [];

  uniques.forEach(date => {
    graphData.push(dictionary[date]);
  });

  return graphData;
}

export const getFormattedData = function(data) {
  const uniques = getUniqueDates(data);
  const dictionary = getDictionary(data);
  return getGraphData(uniques, dictionary);
};
