/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AppContext } from "../App";

export default function AddMember({ addMemberToGroup }) {
  const { addFriendToList, memberData, setMemberData } = useContext(AppContext);
  const generateMemberId = () => {
    return Math.floor(10000 + Math.random() * 900000);
  };

  // Handle input changes and updates form data state
  const handleMemberDataChange = (event) => {
    const { name, value } = event.target;
    setMemberData((prevMemberData) => ({
      ...prevMemberData,
      [name]: value,
    }));
  };

  const addNewGroupMember = () => {
    addMemberToGroup(memberData);
    let storedFriendsData =
      JSON.parse(localStorage.getItem("friendsData")) || [];
    //append new form data to array
    storedFriendsData.push({ name: memberData.name, id: memberData.id });
    //save updated array to local storage
    localStorage.setItem("friendsData", JSON.stringify(storedFriendsData));
    setMemberData((prevMemberData) => ({
      ...prevMemberData,
      name: "",
      share: "",
      id: generateMemberId(),
    }));
    addFriendToList({ name: memberData.name, id: memberData.id });
  };

  return (
    <div className="flex">
      <input
        className="w-2/6 p-2  m-1 text-left text-gray-500 border border-gray-300 rounded-md h-9"
        type="text"
        placeholder="Member name"
        value={memberData.name}
        name="name"
        onChange={handleMemberDataChange}
      />
      <input
        className="w-1/6 p-2 m-1  text-left text-gray-500 border border-gray-300 rounded-md h-9"
        type="text"
        placeholder="id"
        value={`#${memberData.id}`}
        name="id"
        onChange={handleMemberDataChange}
      />
      <input
        className="w-1/6 p-2 m-1  text-left text-gray-500 border border-gray-300 rounded-md h-9"
        type="text"
        placeholder="Share"
        value={memberData.share}
        name="share"
        onChange={handleMemberDataChange}
      />
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
