import { Bar} from "react-chartjs-2";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import histogramDownloader from "../helpers/histogramDownloader";
import { useRef, useEffect } from "react";

// Registering necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ExpenseHistogram = ({ groups }) => {
  const chartRef = useRef();
  const { downloadImage, downloadPDF } = histogramDownloader(chartRef);

  useEffect(() => {
    if (chartRef.current) {
      console.log("Chart is rendered and ready for export.");
    } else {
      console.error("Chart reference is not set yet.");
    }
  }, [chartRef]);

  const data = {
    labels: groups.map((group) => group.name),
    datasets: [
      {
        label: "",
        data: groups.map((group) =>
          (group.expenses || []).reduce(
            (acc, exp) => acc + Number(exp.amount),
            0
          )
        ),
        backgroundColor: "#74779C",
        barPercentage: 1.0, // set to 1.0 for no spacing
        categoryPercentage: 0.8, // width of the bar
      },
      {
        label: "",
        data: groups.map((group) => group.allottedBudget),
        backgroundColor: "#989898",
        barPercentage: 1.0, // set to 1.0 for no spacing
        categoryPercentage: 0.8, // width of the bar
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Expenses (USD)", // y-axis title
          font: {
            size: 12,
            weight: "300",
            family: "geologica",
          },
        },
        ticks: {
          font: {
            family: "Geologica",
            size: 12,
            color: "#292929",
          },
        },
        grid: {
          color: "#D8DBE5", // y-axis grid lines
          borderDash: [5, 5], //-----------------Can't get it to work
          z: 1,
        },
        border: {
          color: "#292929", //y-axis border
        },
      },
      x: {
        title: {
          display: true,
          text: "Groups", // x-axis title
          font: {
            size: 12,
            weight: "300",
            family: "geologica",
          },
        },
        ticks: {
          font: {
            family: "Geologica",
            size: 12,
            color: "#292929",
          },
        },
        grid: {
          drawOnChartArea: false,
        },
        border: {
          color: "#292929", // y-axis border
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        anchor: "end",
        align: "end",
        formatter: (value) => {
          if (typeof value !== "number") {
            return Number(value);
          }
          return value;
        },
        color: "#292929",
        font: {
          weight: "400",
          size: 12,
          family: "Geologica",
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full bg-gray-histogram max-w-[785px] max-h-[495px] pt-[24px] pb-[24px] rounded-md border border-border">
      <div className="flex flex-col w-full max-w-[644px] max-h-[447px]">
        <div className="flex flex-col w-full px-[6px] py-[4px] mb-6 rounded-md border border-input-border max-w-[175px] max-h-[40px]">
          <div className="flex items-center">
            <span
              className="block w-[31px] h-[8px] mr-2"
              style={{ backgroundColor: "#74779C" }}
            ></span>
            <span className="font-geologica text-xs text-modal-text leading-[14px]">
              Expenses
            </span>
          </div>
          <div className="flex items-center">
            <span
              className="block w-[31px] h-[8px] mr-2"
              style={{ backgroundColor: "#989898" }}
            ></span>
            <span className="font-geologica text-xs text-modal-text leading-[14px]">
              Allotted Budget
            </span>
          </div>
        </div>
        <Bar
          data={data}
          options={options}
          ref={chartRef}
        />
      </div>
      <div className="flex space-x-2 mt-4">
        <button onClick={downloadImage} className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo">
          Export as PNG
        </button>
        <button onClick={downloadPDF} className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo">
          Export as PDF
        </button>
      </div>
    </div>
  );
};

ExpenseHistogram.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      expenses: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
        })
      ),
      allottedBudget: PropTypes.number.isRequired,
    })
  ).isRequired,
  expenseLabel: PropTypes.string,
  budgetLabel: PropTypes.string,
};

export default ExpenseHistogram;
