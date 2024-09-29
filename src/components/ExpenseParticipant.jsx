import { useState } from "react";
import { IoMdClose } from "react-icons/io";

/* eslint-disable react/prop-types */
export default function ExpenseParticipant({
  expenseParticipants,
  deleteParticipant,
}) {
  const [activeMember, setActiveMember] = useState(null);
  const noMembersMessage = (
    <div className="flex items-center m-2">
      <img src="../../images/Profile.svg" className="m-2" />
      <p className="text-xs text-gray-500">
        There is no one added to expense yet. Try searching and adding from your
        friend list or quickly add someone by entering their user name
      </p>
    </div>
  );

  return expenseParticipants.length < 1 ? (
    noMembersMessage
  ) : (
    <>
      <h3 className="w-full text-center">Member</h3>
      <ul className="flex flex-col">
        {expenseParticipants.map((member) => (
          <li
            className={`flex justify-center w-full p-1 text-sm transition duration-500 ease-in-out transform ${
              activeMember === member.id ? "bg-gray-300" : "hover:bg-gray-300 "
            }`}
            key={member.id}
            onMouseEnter={() => setActiveMember(member.id)}
            onMouseLeave={() => setActiveMember(null)}
          >
            <div className="flex gap-3 w-6/12 items-center justify-start">
              <button
                type="button"
                className={`w-6 h-6 flex items-center justify-center rounded-md  text-black  ${
                  activeMember === member.id ? "bg-red-600 text-white" : ""
                }`}
                onClick={() => deleteParticipant(member)}
              >
                <IoMdClose />
              </button>
              <div className="rounded-full h-7 w-7 border">
                <img src="/public/images/Profile.svg" />
              </div>
              <p className="truncate">{member.userName}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
