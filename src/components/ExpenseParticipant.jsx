import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

/* eslint-disable react/prop-types */
export default function ExpenseParticipant({
  deleteParticipant,
  expensesData,
  addOrUpdateParticipants,
}) {
  const { participants } = expensesData;
  const [currentlyActiveMember, setCurrentlyActiveMember] = useState(null);
  const [participantsShares, setParticipantsShares] = useState({});
  const [totalSharePercent, setTotalSharePercent]= useState(0)

  useEffect(()=>{
    //initialize participantShares w/ existing data from participants
    const initialShares = participants.reduce((acc,participant)=>{
      acc[participant.id]= {
        ...participant,
        sharePercentage: participant.sharePercentage || 0,
        amountToPay: participant.amountToPay || 0
      }
      return acc
    }, {})
    setParticipantsShares(initialShares)

    //calc initial total share percentage
    const initialTotalShare = participants.reduce((total, participant)=> total + (participant.sharePercentage || 0), 0)
    console.log("initial total share:", initialTotalShare)
    setTotalSharePercent(initialTotalShare)
    
  }, [participants])

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
    if (
      enteredSharePercentage > 100 ||
      enteredSharePercentage < 0 ||
      isNaN(enteredSharePercentage) 
      // enteredSharePercentage === "e"
    ) {
      return;
    }

    //calc new total share include entered value
    const currentParticipantShare = participantsShares[member.id]?.sharePercentage || 0
    const newTotalShare = totalSharePercent - currentParticipantShare + enteredSharePercentage

    if(newTotalShare >100){
      toast.error("Total share percentage cannot exceed 100%")
      return
    }

    const amountToPay = (expensesData.amount * enteredSharePercentage) / 100;

    const updatedParticipant = {
      ...member,
      amountToPay: amountToPay,
      sharePercentage: enteredSharePercentage,
    };

    setParticipantsShares((prev) => ({
      ...prev,
      [member.id]: {
        ...member,
        sharePercentage: enteredSharePercentage,
        amountToPay: amountToPay,
      },
    }));

    addOrUpdateParticipants(updatedParticipant);
  }

  function handleInvalidCharacters(event) {
    const invalidCharacters = ["e", "E", "-", "+"];
    if (invalidCharacters.includes(event.key)) {
      event.preventDefault();
    }
  }

  

  return participants.length < 1 ? (
    noParticipantsMessage
  ) : (
    <>
      <ul className="flex flex-col items-start">
        <div className="flex w-full my-1">
          <h3 className="w-4/12 text-center">Member</h3>
          <h3 className="w-2/12 text-center">Share</h3>
          <h3 className="w-6/12 text-center">How much will you pay</h3>
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
            <div className="flex items-center w-4/12 truncate justify-evenly">
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
              <div className="border rounded-full h-7 w-7">
                <img src="/public/images/Profile.svg" />
              </div>
              <p>{member.userName}</p>
            </div>

            <div className="flex justify-center w-2/12">
              <input
                onKeyDown={handleInvalidCharacters}
                value={participantsShares[member.id]?.sharePercentage || ""}
                type="number"
                placeholder={0}
                step={5}
                className="w-8/12 text-center h-7"
                onChange={(event) => handleSharedValue(event, member)}
              />
            </div>
            <div className="w-6/12 text-center">
              <label>
                {participantsShares[member.id]?.amountToPay >= 0
                  ? participantsShares[member.id].amountToPay
                  : 0}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
