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

const dashboard24HoursPerformanceChart = {
  data: (canvas) => {
    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
      datasets: [
        {
          borderColor: "#6bd098",
          backgroundColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354],
        },
        {
          borderColor: "#f17e5d",
          backgroundColor: "#f17e5d",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420],
        },
        {
          borderColor: "#fcc468",
          backgroundColor: "#fcc468",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484],
        },
      ],
    };
  },
  options: {
    legend: {
      display: false,
    },

    tooltips: {
      enabled: false,
    },

    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: "#9f9f9f",
            beginAtZero: false,
            maxTicksLimit: 5,
            //padding: 20
          },
          gridLines: {
            drawBorder: false,
            zeroLineColor: "#ccc",
            color: "rgba(255,255,255,0.05)",
          },
        },
      ],

      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(255,255,255,0.1)",
            zeroLineColor: "transparent",
            display: false,
          },
          ticks: {
            padding: 20,
            fontColor: "#9f9f9f",
          },
        },
      ],
    },
  },
};

const dashboardEmailStatisticsChart = {
  data: (canvas) => {
    return {
      labels: [1, 2, 3],
      datasets: [
        {
          label: "Emails",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
          borderWidth: 0,
          data: [342, 480, 530, 120],
        },
      ],
    };
  },
  options: {
    legend: {
      display: false,
    },

    pieceLabel: {
      render: "percentage",
      fontColor: ["white"],
      precision: 2,
    },

    tooltips: {
      enabled: false,
    },

    scales: {
      yAxes: [
        {
          ticks: {
            display: false,
          },
          gridLines: {
            drawBorder: false,
            zeroLineColor: "transparent",
            color: "rgba(255,255,255,0.05)",
          },
        },
      ],

      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(255,255,255,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
  },
};

const dashboardNASDAQChart = {
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
        fill: false,
        borderColor: "#fbc658",
        backgroundColor: "transparent",
        pointBorderColor: "#fbc658",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      },
      {
        data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
        fill: false,
        borderColor: "#51CACF",
        backgroundColor: "transparent",
        pointBorderColor: "#51CACF",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      },
    ],
  },
  options: {
    legend: {
      display: false,
      position: "top",
    },
  },
};

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
