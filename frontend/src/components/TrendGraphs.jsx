import React from "react";
import {Chart as ChartJS, defaults, Legend} from "chart.js/auto";
import {Bar, Line} from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const TrendGraphs = ({
  chartData,
  chosenGraphType,
  peakOrderHour,
  chartTitle,
}) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: chartTitle,
      },
      legend: {
        position: "chartArea",
        align: "start",
      },
    },
  };

  return (
    <div className="card mt-3 shadow me-4" style={{width: "90%"}}>
      {chosenGraphType === "DOC" && (
        <Line
          data={{
            labels: chartData.map((data) => data.orderDate),
            datasets: [
              {
                label: "Daily Orders Count",
                data: chartData.map((data) => data.dailyOrdersCount),
                fill: false,
                borderColor: "#47AE77",
                tension: 0.3,
              },
            ],
          }}
          options={options}
        />
      )}
      {chosenGraphType === "DR" && (
        <Line
          data={{
            labels: chartData.map((data) => data.orderDate),
            datasets: [
              {
                label: "Daily Revenue",
                data: chartData.map((data) => data.dailyRevenue),
                fill: false,
                borderColor: "#3365C1",
                tension: 0.3,
              },
            ],
          }}
          options={options}
        />
      )}
      {chosenGraphType === "AOV" && (
        <Line
          data={{
            labels: chartData.map((data) => data.orderDate),
            datasets: [
              {
                label: "Average Order Value",
                data: chartData.map((data) => data.avgOrder),
                fill: false,
                borderColor: "#923A78",
                tension: 0.3,
              },
            ],
          }}
          options={options}
        />
      )}
      {chosenGraphType === "POH" && (
        <Line
          data={{
            labels: peakOrderHour.map((data) => data.orderDate),
            datasets: [
              {
                label: "Peak Order Hour",
                data: peakOrderHour.map((data) => data.hour),
                fill: false,
                borderColor: "#DE8502",
                tension: 0.3,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Peak Order Hour",
              },
              legend: {
                position: "chartArea",
                align: "start",
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const pointedData = peakOrderHour[context.dataIndex];
                    console.log(peakOrderHour);
                    return [
                      "Peak Order Hour:" + pointedData.hour,
                      "Peak Revenue:" + pointedData.maxRevenue,
                    ];
                  },
                },
              },
            },
            scales: {
              y: {
                min: 0,
                max: 24,
                ticks: {
                  stepSize: 3,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default TrendGraphs;
