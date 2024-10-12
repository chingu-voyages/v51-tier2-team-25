import { useState,useContext } from "react";
import { IoMdClose } from "react-icons/io";

import { AppContext } from "../App";

/* eslint-disable react/prop-types */
export default function MembersOnGroup({ groupMembers, deleteMemberFromGroup,}){
  const { mainUser }= useContext(AppContext)
  const [activeMember, setActiveMember] = useState(null);

  const renderAvatar = (member) => {
    if (!member.avatar) {
      return <img src="/images/Profile.svg" alt="Profile Avatar" className="w-6 h-6 rounded-full" />;
    }
    
    if (member.avatar.startsWith('data:image/svg+xml')) {
      return <div className="w-6 h-6 border rounded-full" dangerouslySetInnerHTML={{ __html: decodeURIComponent(member.avatar.split(',')[1]) }} />;
    }
    
    return <img src={member.avatar} alt="Profile Avatar" className="w-6 h-6 rounded-full" />;
  };

  const noMembersMessage = (
    <div className="flex items-center md:m-2 ">
      <img src="../../images/Profile.svg" alt="Profile Placeholder"className="m-2" />
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
      <h3 className="mb-2 text-sm">Member</h3>
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
                onClick={() => {
                  if(member.id !== mainUser.id){
                    deleteMemberFromGroup(member)
                  }
                }}
                disabled={member.id === mainUser.id}
              >
                <IoMdClose />
              </button>
              {renderAvatar(member)}
              <p className="truncate">{member.userName}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

