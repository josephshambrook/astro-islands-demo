import { addLog } from "@state/LogStore";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: "index" as const,
  },
  animation: {
    delay: 500,
  },
  elements: {
    point: {
      borderWidth: 4,
    },
  },
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        boxHeight: 3,
      },
    },
  },
};

const labels = ["2019", "2020", "2021", "2022"];

export const data = {
  labels,
  datasets: [
    {
      label: "Desktop",
      data: [391, 444, 463, 509],
      borderColor: "#802653",
      backgroundColor: "#802653",
    },
    {
      label: "Mobile",
      data: [359, 411, 427, 461],
      borderColor: "#43244f",
      backgroundColor: "#43244f",
    },
  ],
};

export const Graph = () => {
  useEffect(() => {
    addLog("Graph component mounted");
  }, []);

  return (
    <>
      <p>Mean amount of JS bytes distributed on webpages</p>
      <div className="bg-white flex flex-col relative items-center justify-center mt-4 py-5 px-2 h-[400px]">
        <Line options={options} data={data} />
      </div>
      <p className="text-xs mt-2">
        Figures provided by annual Web Almanac Report
      </p>
    </>
  );
};
