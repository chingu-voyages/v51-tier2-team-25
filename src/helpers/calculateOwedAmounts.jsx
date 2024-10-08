const calculateOwedAmounts = (group) => {
    const owedAmounts = {};
  
    group.expenses.forEach((expense) => {
      const amountPerParticipant = Number(expense.amount) / expense.participants.length;
  
      expense.participants.forEach((participant) => {
        if (!owedAmounts[participant.id]) {
          owedAmounts[participant.id] = {
            name: participant.name,
            totalOwed: 0,
            picture: participant.picture,
          };
        }
        owedAmounts[participant.id].totalOwed += amountPerParticipant;
      });
    });
  
    return owedAmounts;
  };
    
  export default calculateOwedAmounts;