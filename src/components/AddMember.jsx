/* eslint-disable react/prop-types */
import { useState } from "react";
import SearchBar from "./SearchBar";
import toast from "react-hot-toast";

export default function AddMember({ addMemberToGroup, groupMembers }) {
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
      toast("Member is already in the group");
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
