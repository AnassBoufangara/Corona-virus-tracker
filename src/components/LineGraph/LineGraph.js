import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";
import numeral from 'numeral';

import { historicalData } from '../../api';



const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            callbacks: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };
  



function LineGraph({ casesType }) {
    const [historicalDt, setHistoricalDt] = useState({});

    useEffect(() => {
        historicalData(setHistoricalDt, casesType);
    }, [casesType]);

    return (
        <div>
            {
                historicalDt?.length > 0 && (
                    <Line
                        options={options}
                        data={{
                            datasets: [
                                {
                                    label: "Cases",
                                    fill: true,
                                    backgroundColor: "rgba(102, 51, 153, 0.2)",
                                    borderColor: "rgba(102, 51, 153, 1)",
                                    data: historicalDt,
                                },
                            ],
                        }}
                  />
                )
            }
        </div>
    )
}

export default LineGraph
