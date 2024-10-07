import { useState } from "react";
import { IoMdClose } from "react-icons/io";

/* eslint-disable react/prop-types */
export default function MembersOnGroup({
  groupMembers,
  deleteMemberFromGroup,
}) {
  const [activeMember, setActiveMember] = useState(null);
  const noMembersMessage = (
    <div className="flex items-center md:m-2 ">
      <img src="../../images/Profile.svg" className="m-2" />
      <p className="text-xs text-gray-500">
        There is no one added to expense yet. Try searching and adding from your
        friend list or quickly add someone by entering their user name
      </p>
    </div>
  );

  return groupMembers.length < 1 ? (
    noMembersMessage
  ) : (
    <div className="flex flex-col items-center">
      <h3 className="text-sm mb-2">Member</h3>
      <ul className="flex flex-col">
        {groupMembers.map((member) => (
          <li
            className={`flex p-1 text-sm transition duration-500 ease-in-out transform ${
              activeMember === member.id
                ? "bg-gray-300 scale-105"
                : "hover:bg-gray-300 hover:scale-105"
            }`}
            key={member.id}
            onMouseEnter={() => setActiveMember(member.id)}
            onMouseLeave={() => setActiveMember(null)}
          >
            <div className="flex items-center w-auto gap-3">
              <button
                className={`w-6 h-6 flex items-center justify-center rounded-md  text-black  ${
                  activeMember === member.id ? "bg-red-600 text-white" : ""
                }`}
                onClick={() => deleteMemberFromGroup(member)}
              >
                <IoMdClose />
              </button>
              <div className="border rounded-full h-7 w-7">
                <img src="/images/Profile.svg" />
              </div>
              <p className="truncate">{member.userName}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
