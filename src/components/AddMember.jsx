/* eslint-disable react/prop-types */
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function AddMember({ addMemberToGroup, groupMembers }) {
  const [newMember, setNewMember] = useState("");

  function handleMemberSelected(newMember) {
    setNewMember(newMember);
  }

  const addNewGroupMember = () => {
    const isMemberAllreadyIncluded = groupMembers.some(
      (member) =>
        member.userName.toLowerCase() === newMember.userName.toLowerCase()
    );
    if (isMemberAllreadyIncluded) {
      return;
    }
    addMemberToGroup(newMember);
  };

  return (
    <div className="flex w-full">
      <SearchBar handleMemberSelected={handleMemberSelected} />
      <button
        onClick={addNewGroupMember}
        type="button"
        className="w-2/6 px-4 py-2 m-1 text-sm bg-gray-300 rounded-xl"
      >
        Add to group
      </button>
    </div>
  );
}
