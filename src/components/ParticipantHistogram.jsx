import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import calculateOwedAmounts from "../helpers/calculateOwedAmounts";

const ParticipantHistogram = ({ group }) => {
  const owedAmounts = calculateOwedAmounts(group);

  const data = {
    labels: Object.values(owedAmounts).map(o => o.name),
    datasets: [
      {
        label: "",
        data: Object.values(owedAmounts).map(o => o.totalOwed),
        backgroundColor: "#74779C",
        barPercentage: 0.5, // set to 1.0 for no spacing
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
          z: 1,
        },
        border: {
          color: "#292929", //y-axis border
        },
      },
      x: {
        title: {
          display: true,
          text: "Participants", // x-axis title
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
          anchor: 'end',
          align: 'end',
          formatter: (value) => {
            if (typeof value !== 'number') {
              return Number(value); 
            }
            return value;},
          color: '#292929', 
          font: {
            weight: '400',
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
              className="block w-[30px] h-[2px] mr-2 border-b-2 border-dashed border-red-average w-full my-2"
            ></span>
            <span className="font-geologica text-xs text-modal-text leading-[14px]">
              Average owed
            </span>
          </div>
        </div>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

ParticipantHistogram.propTypes = {
  group: PropTypes.shape({
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        participants: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            userName: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default ParticipantHistogram;

