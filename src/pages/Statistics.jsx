import { useContext } from 'react';
import { AppContext } from '../App';
import ExpenseHistogram from '../components/ExpenseHistogram';


const Statistics = () => {
  const { groups } = useContext(AppContext);

  return (
    <div>
      <h1 className='text-button text-sm leading-[16.8px]'>Total Expenses vs Allotted Budget</h1>
      <div>
      <ExpenseHistogram groups={groups} />
      </div>
    </div>
  );
};

export default Statistics;