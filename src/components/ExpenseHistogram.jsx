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
          label: 'Total Expenses',
          data: groups.map(group =>
            (group.expenses || []).reduce((acc, exp) => acc + Number(exp.amount), 0)
          ),
          backgroundColor: '#74779C', 
          barPercentage: 0.5,
        },
        {
            label: 'Allotted Budget',
            data: groups.map(group => group.allottedBudget),
            backgroundColor: '#989898',
            barPercentage: 0.5,
          },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Total Expenses vs Allotted Budget',
        },
      },
    };
  
    return <Bar data={data} options={options} />;
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