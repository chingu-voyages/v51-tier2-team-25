/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import { AppContext } from "../App";

export default function AddMember({ 
  addMemberToGroup, 
  groupMembers,
}) {
  const {showNotification} = useContext(AppContext)
  const [newMember, setNewMember] = useState("");

  function handleMemberSelected(newMember) {
    setNewMember(newMember);
  }

  const addNewGroupMember = () => {
    if (newMember === "") {
      return;
    }
    const isMemberAllreadyIncluded = groupMembers.some(
      (member) =>
        member.userName.toLowerCase() === newMember.userName.toLowerCase()
    );

    if (isMemberAllreadyIncluded) {
      showNotification("Member is already in the group");
      return;
    }

    addMemberToGroup(newMember);

    
  };

  return (
    <div>
      <p className="my-4 text-sm ">Add members</p>
      <div className="flex items-center justify-end">
        <div className="flex-grow mr-2">
          <SearchBar handleMemberSelected={handleMemberSelected} />
        </div>

        <button
          onClick={addNewGroupMember}
          type="button"
          className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo"
        >
          Add to group
        </button>
      </div>
    </div>
  );
}
