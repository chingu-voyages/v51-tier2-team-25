const calculateOwedAmounts = (group) => {
    const owedAmounts = {};
  
    group.expenses.forEach((expense) => {  
      expense.participants.forEach((participant) => {
        if (!owedAmounts[participant.id]) {
          owedAmounts[participant.id] = {
            name: participant.name,
            totalOwed: 0,
          };
        }
        owedAmounts[participant.id].totalOwed += participant.amountToPay;
      });
    });
  
    return owedAmounts;
  };
  
  export default calculateOwedAmounts;