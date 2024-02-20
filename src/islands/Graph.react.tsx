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
  interaction: {
    intersect: false,
    mode: "index" as const,
  },
  animation: {
    delay: 500,
    onComplete: function () {
      addLog("Graph rendered and animated");
    },
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
    title: {
      display: true,
      text: "Mean amount of JS bytes distributed on webpages",
      padding: {
        top: 10,
        bottom: 20,
      },
      font: {
        weight: "bold" as const,
        size: 20,
      },
    },
    subtitle: {
      display: true,
      text: "Figures provided by annual Web Almanac Report",
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
      // backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Mobile",
      data: [359, 411, 427, 461],
      borderColor: "#43244f",
      backgroundColor: "#43244f",
      // backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const Graph = () => {
  return (
    <div className="bg-white flex flex-col relative items-center mt-4 py-5 px-10">
      <Line options={options} data={data} />
      {/* <p className="text-xs mt-2">
        Figures provided by annual Web Almanac Report
      </p> */}
    </div>
  );
};
