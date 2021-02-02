/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import moment from "moment";

export const defectStatusCount = (defects) => {
  let openDefects = 0;
  let closedDefects = 0;
  let immediateDefects = 0;

  if (defects.length !== 0) {
    defects.forEach(defect => {
      if (defect.status === 'OPEN') {
        openDefects++;
      }
      if (defect.priority === 'IMMEDIATE' && defect.status === 'OPEN') {
        immediateDefects++;
      }
    });
  }

  closedDefects = defects.length - openDefects;

  return { openDefects, closedDefects, immediateDefects };
}

export const defectCountInPastSixMonths = (defects, currentDate) => {
  function getPreviousMonth(month, year) {
    month = month - 1;
    year = month === - 1 ? (year - 1) : year;
    const date = moment().date(1).month(month).year(year);

    return {
      date,
      monthYear: moment(date).format('MMM YYYY')
    }
  }

  function getLastSixMonths(currentDate) {
    let dateToIterate = { date: currentDate, monthYear: moment(currentDate).format("MMM YYYY") };
    let lastSixMonths = new Map();
    lastSixMonths.set(dateToIterate.monthYear, 0);

    console.log(dateToIterate);

    for (let i = 0; i < 5; i++) {
      dateToIterate = getPreviousMonth(dateToIterate.date.month(), dateToIterate.date.year());
      lastSixMonths.set(dateToIterate.monthYear, 0)
    }

    return lastSixMonths;
  }

  const lastSixMonths = getLastSixMonths(currentDate);
  let defectCountData = [];

  // add count to each defect that matches month and year
  defects.forEach(defect => {
    let monthYear = defect.identifiedMonthYear;
    if (lastSixMonths.has(monthYear)) {
      lastSixMonths.set(monthYear, lastSixMonths.get(monthYear) + 1)
    }
  })

  for (let [key, value] of lastSixMonths) {
    defectCountData.push({ monthYear: key, count: value });
  }

  return defectCountData.reverse();
}
