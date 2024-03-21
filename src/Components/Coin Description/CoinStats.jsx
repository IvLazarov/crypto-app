import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";
import moment from "moment";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

const CoinStats = () => {
  const [coinPrices, setCoinPrices] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setCoinPrices(data.prices);
      });
  }, []);

  const chartData = coinPrices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const data = {
    labels: chartData.map((value) => moment(value.x).format("DD MMM YYYY")),
    datasets: [
      {
        label: `${id[0].toUpperCase()}${id.substring(1)} 24h Price USD`,
        data: chartData.map((val) => val.y),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "#3B3B3B",
        pointBorderColor: "aqua",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  console.log(chartData);

  return (
    <div className="chart">
      <div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CoinStats;
