const calculateOwedAmounts = (group) => {
    const owedAmounts = {};
    let totalOwed = 0;
    let participantCount = 0;
  
    group.expenses.forEach((expense) => {  
      expense.participants.forEach((participant) => {
        if (!owedAmounts[participant.id]) {
          owedAmounts[participant.id] = {
            name: participant.name,
            totalOwed: 0,
          };
        }
        if (!participant.isPaid){
        owedAmounts[participant.id].totalOwed += participant.amountToPay;
        totalOwed += participant.amountToPay;
          participantCount++;
        }
      });
    });
  
    const averageOwed = participantCount > 0 ? totalOwed / participantCount : 0;

    return {owedAmounts, averageOwed};
  };
  
  export default calculateOwedAmounts;