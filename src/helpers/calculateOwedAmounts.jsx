const calculateOwedAmounts = (group) => {
    const owedAmounts = {};
  
    group.expenses.forEach((expense) => {
      const amountPerParticipant = Number(expense.amount) / expense.participants.length;
  
      expense.participants.forEach((participant) => {
        if (!owedAmounts[participant.id]) {
          owedAmounts[participant.id] = {
            name: participant.userName,
            totalOwed: 0,
          };
        }
        owedAmounts[participant.id].totalOwed += amountPerParticipant;
      });
    });
  
    return owedAmounts;
  };
  
  export default calculateOwedAmounts;