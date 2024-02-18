import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { PricesDataState } from "../../types/coin";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  scales: {
    x: {
      display: true,
      grid: {
        color: "rgb(51, 65, 85)",
      },
      color: "red",
    },
    y: {
      display: true,
      grid: {
        color: "rgb(51, 65, 85)",
      },
    },
  },
};

function format_time(s: number) {
  return new Date(s)
    .toLocaleDateString("ua", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .replaceAll("/", ".");
}

interface ILineChart {
  coin_id?: string;
  days: number;
}

const LineChart: FC<ILineChart> = ({ coin_id, days }) => {
  const [dataForChart, setDataForChart] = useState<number[][]>();
  const [chartData, setChartData] = useState<any>({
    datasets: [],
    labels: [],
  });

  useEffect(() => {
    if (dataForChart && dataForChart.length >= 1) {
      setChartData({
        labels: dataForChart.map((data) => format_time(data[0])),
        datasets: [
          {
            data: dataForChart.map((data) => data[1]),
            borderWidth: 2,
            label: `${coin_id}`,
            pointStyle: false,
            borderColor: "rgba(75, 192, 192, 1)",
            options: {
              plugins: {
                title: {
                  display: true,
                  text: "Grid Line Settings",
                },
              },
            },
          },
        ],
      });
    }
  }, [dataForChart]);

  useEffect(() => {
    fetchPricesData();
  }, [days]);

  async function fetchPricesData() {
    try {
      const response = await axios.get<PricesDataState>(
        `https://coingecko-back.onrender.com/getChartForCoin/${coin_id}/${days}`
      );
      setDataForChart(response.data.prices);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <Line data={chartData} width={"800px"} height={"600px"} options={options} />
  );
};
export default LineChart;
