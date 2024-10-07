import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
// import { color } from 'chart.js/helpers';

// Registering necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const ExpenseHistogram = ({ groups }) => {
    const data = {
      labels: groups.map(group => group.name),
      datasets: [
        {
          label: '',
          data: groups.map(group =>
            (group.expenses || []).reduce((acc, exp) => acc + Number(exp.amount), 0)
          ),
          backgroundColor: '#74779C', 
        barPercentage: 1.0, // set to 1.0 for no spacing
        categoryPercentage: 0.8, // width of the bar
        },
        {
            label: '',
            data: groups.map(group => group.allottedBudget),
            backgroundColor: '#989898',
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
            text: 'Expenses (USD)', // y-axis title
            font: {
                size: 12,
                weight: 'normal',
                family: 'geologica',
            }
          },
          ticks: {
            font: {
              family: 'Geologica',
              size: 12,
              color: '#292929',
            }
          }
        },
        x: {
            title: {
              display: true,
              text: 'Groups', // x-axis title
              font: {
                size: 12,
                family: 'geologica',
            }
            },
            ticks: {
                font: {
                  family: 'Geologica',
                  size: 12,
                  color: '#292929'
                }
              }
          },
      },
      plugins: {
        legend: {
            display: false,
        //   position: 'top',
        //   labels: {
        //     font: {
        //       family: 'Geologica', 
        //     },
        //   },
        },
      // isn't working yet
        // datalabels: {
        //     anchor: 'end',
        //     align: 'end',
        //     formatter: (value) => value.toFixed(2), // Format the number
        //     color: '#FFFFFF', // Color of the labels
        //     font: {
        //       weight: 'bold',
        //     },
        //   },
      },
    };
  
    return (
        <div className="flex flex-col  justify-center w-full bg-gray-histogram max-w-[785px] max-h-[495px] rounded-[8px] border-border text-gray-800 ">
               <div className="flex flex-col justify-between w-full px-4 py-2">
                <div className="flex items-center">
                    <span className="block w-10 h-4 mr-2" style={{ backgroundColor: '#74779C' }}></span>
                    <span className="font-geologica text-lg text-gray-800">Total Expenses</span>
                </div>
                <div className="flex items-center">
                    <span className="block w-10 h-4 mr-2" style={{ backgroundColor: '#989898' }}></span>
                    <span className="font-geologica text-lg text-gray-800">Allotted Budget</span>
                </div>
            </div>
            <div className="max-w-[644px] max-h-[447px]">
            <Bar data={data} options={options} />
            </div>
        </div>
    )
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
  };

export default ExpenseHistogram;