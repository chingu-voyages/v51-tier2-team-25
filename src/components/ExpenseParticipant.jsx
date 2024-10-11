import { useState, useEffect, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { calculateAmountsToPay } from "../helpers/CalculateAmountsToPay";

import { AppContext } from "../App";

/* eslint-disable react/prop-types */
export default function ExpenseParticipant({
  deleteParticipant,
  expensesData,
  addOrUpdateParticipants,
}) {
  const { mainUser }= useContext(AppContext)
  const { participants } = expensesData;
  const [currentlyActiveMember, setCurrentlyActiveMember] = useState(null);
  const [participantsShares, setParticipantsShares] = useState({});

  useEffect(() => {
    const initialShares = participants.reduce((acc, participant) => {
      acc[participant.id]= {
        ...participant,
        sharePercentage: participant.sharePercentage || 0,
        amountToPay: participant.amountToPay || 0,
        isPaid: participant.isPaid || false,
      }
      return acc
    }, {})
    setParticipantsShares(initialShares)

    participants.forEach(participant => addOrUpdateParticipants(participant));
  }, []);

  const noParticipantsMessage = (
    <div className="flex items-center m-2">
      <img src="../../images/Profile.svg" className="m-2" />
      <p className="text-xs text-gray-500">
        There is no one added to expense yet. Try searching and adding from your
        friend list or quickly add someone by entering their user name
      </p>
    </div>
  );

  function handleSharedValue(event, member) {
    const enteredSharePercentage = parseInt(event.target.value) || 0;

    setParticipantsShares((prev) => {
      const updatedMember = {
        ...prev[member.id],
        sharePercentage: enteredSharePercentage,
      };
    
      const { updatedShares} = calculateAmountsToPay(
        [...participants, updatedMember], // Include updated member
        expensesData.amount
      );
    
      return updatedShares;
    });

    const { updatedShares } = calculateAmountsToPay(participants, expensesData.amount);

    setParticipantsShares(updatedShares);

    addOrUpdateParticipants({
      ...member,
      sharePercentage: enteredSharePercentage,
      amountToPay: participantsShares[member.id]?.amountToPay || 0,
      isPaid: false,
    });
  }

  function handleInvalidCharacters(event) {
    const invalidCharacters = ["e", "E", "-", "+"];
    if (invalidCharacters.includes(event.key)) {
      event.preventDefault();
    }
  }

  useEffect(() => {
    if (expensesData.amount) {
      const { updatedShares } = calculateAmountsToPay(participants, expensesData.amount);
      setParticipantsShares(updatedShares);
    }
  }, [participants, expensesData.amount]);
  

  return participants.length < 1 ? (
    noParticipantsMessage
  ) : (
    <>
      <ul className="flex flex-col items-start">
        <div className="flex w-full my-1">
          <h3 className="w-4/12 text-sm text-center">Member</h3>
          <h3 className="w-2/12 text-sm text-center">Share</h3>
          <h3 className="w-6/12 text-sm text-center">How much will you pay</h3>
        </div>

        {participants.map((member) => (
          <li
            className={`flex col w-full p-1 text-sm justify-center items-center transition duration-500 ease-in-out transform ${
              currentlyActiveMember === member.id
                ? "bg-gray-300"
                : "hover:bg-gray-300 "
            }`}
            key={member.id}
            onMouseEnter={() => setCurrentlyActiveMember(member.id)}
            onMouseLeave={() => setCurrentlyActiveMember(null)}
          >
            <div className="flex items-center justify-start w-4/12 gap-2 truncate">
              <button
                type="button"
                className={`w-6 h-6 flex items-center justify-center rounded-md  text-black  ${
                  currentlyActiveMember === member.id
                    ? "bg-red-600 text-white"
                    : ""
                }`}
                onClick={() => deleteParticipant(member)}
              >
                <IoMdClose />
              </button>
              {member.id === mainUser.id ? (                
                <img src={member.avatar || "/images/Profile.svg"} alt="Profile Avatar"className="w-6 h-6 border rounded-full"/>              
              ) : ( 
                <img src={member?.avatar} className='w-6 h-6 border-border'/>  
              )}
              <p>{member.userName}</p>
            </div>

            <div className="flex justify-center w-2/12">
              <input
                onKeyDown={handleInvalidCharacters}
                value={participantsShares[member.id]?.sharePercentage || ""}
                type="number"
                placeholder={0}
                step={10}
                className="w-8/12 text-center h-7"
                onChange={(event) => handleSharedValue(event, member)}
              />
            </div>
            <div className="w-6/12 text-center">
              <label>
                {participantsShares[member.id]?.amountToPay.toFixed(2) >= 0
                  ? participantsShares[member.id].amountToPay.toFixed(2)
                  : 0}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
