import { useContext } from 'react';
import { AppContext } from '../App';
import ExpenseHistogram from '../components/ExpenseHistogram';
import ParticipantHistogram from '../components/ParticipantHistogram';
import { useLocation } from 'react-router-dom';

const Statistics = () => {
  const { groups } = useContext(AppContext);
  const location = useLocation();

    // checking if we are in a specific group context
  const isGroupStatistics = location.pathname.startsWith('/group/');

  // finding specific group by extracting groupId from the URLspecific group
  const groupId = location.pathname.split('/')[2];
  const group = groups.find(group => group.id === Number(groupId));

  return (
    <div>
      <h1 className='text-button text-sm leading-[16.8px]'>{isGroupStatistics ? 'Participant expenses vs. Average owed amount' : 'Total Expenses vs Allotted Budget'}</h1>
      {isGroupStatistics ? (
        group ? (
          <ParticipantHistogram group={group} />
        ) : (
          <p>Group not found.</p>
        )
      ) : (
        <div>
      <ExpenseHistogram groups={groups} />
      </div>
      )}
    </div>
  );
};

export default Statistics;

