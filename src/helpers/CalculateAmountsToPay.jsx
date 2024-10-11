export const calculateAmountsToPay = (participants, amount) => {
    const participantsWithShare = participants.filter(
      (participant) => participant.sharePercentage > 0
    );
    const totalSharePercentage = participantsWithShare.reduce(
      (total, participant) => total + participant.sharePercentage,
      0
    );
    const updatedShares = {};
  
    participantsWithShare.forEach((participant) => {
      const amountToPay = (amount * participant.sharePercentage) / 100;
      updatedShares[participant.id] = {
        ...participant,
        amountToPay,
      };
    });
  
    const remainingAmount =
      amount -
      participantsWithShare.reduce(
        (total, participant) => total + updatedShares[participant.id].amountToPay,
        0
      );
  
    const zeroShareParticipants = participants.filter(
      (participant) => participant.sharePercentage === 0
    );
  
    const amountPerZeroShareParticipant =
      zeroShareParticipants.length > 0 ? remainingAmount / zeroShareParticipants.length : 0;
  
    zeroShareParticipants.forEach((participant) => {
      updatedShares[participant.id] = {
        ...participant,
        amountToPay: amountPerZeroShareParticipant,
        sharePercentage: 0,
      };
    });
  
    return { updatedShares, totalSharePercentage };
  };