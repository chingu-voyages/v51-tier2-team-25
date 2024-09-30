import { useContext, useState } from "react";
import { AppContext } from "../App";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import AddMember from "./AddMember";
import MembersOnGroup from "./MembersOnGroup";
import GroupTypeSelection from "./GroupTypeSelection";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types

export default function AddGroup({
  closeAddGroupModal,
  openLinkAddFriendModal,
}) {
  const { addGroupToList } = useContext(AppContext);

  //Maybe move this to a helper function also maybe use uuid library?
  const generateGroupId = () => {
    return Math.floor(10000 + Math.random() * 900000);
  };

  // Do not allow none numeric keys
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const temporaryGroupData = JSON.parse(
    localStorage.getItem("temporaryGroupData")
  );

  // Initialize state for groupsData
  const [groupsData, setGroupsData] = useState(
    temporaryGroupData
      ? temporaryGroupData
      : {
          name: "",
          id: generateGroupId(),
          description: "",
          allottedBudget: "",
          members: [],
          groupType: "",
          expenses: [],
        }
  );

  //render groupID to be visible on form
  const renderGroupId = () => {
    return groupsData.id ? (
      <p className="absolute top-0 p-0 m-0 text-xs text-gray-400 right-8">
        #{groupsData.id}
      </p>
    ) : null;
  };

  // Handle input changes and updates form data state
  const handleChange = (event) => {
    const { name, value, type } = event.target;

    //check if value is empty or contains only spaces
    if (value.trim() === "" && value.length > 0) {
      toast.error("Input cannot be empty or contain only spaces");
      return;
    }

    //check if value exceeds max allowed
    if (type === "number") {
      const newValue = parseFloat(value);

      if (!isNaN(newValue) && newValue > 1000000) {
        toast.error("Alloted budget cannot exceed $1,000,000");
        return;
      }
    }

    setGroupsData((prevGroupsData) => ({
      ...prevGroupsData,
      [name]: value,
    }));
  };

  const addNewGroup = (event) => {
    event.preventDefault();

    const budgetRegex = /^(0|[1-9]\d*)(\.\d+)?$/;

    if (!budgetRegex.test(groupsData.allottedBudget)) {
      toast.error("Allotted budget must be a valid number");
      return;
    }

    if (groupsData.groupType === "") {
      toast.error("Please select a Group type");
      return;
    }

    //get stored data from local storage or initialize array
    let storedGroupData = JSON.parse(localStorage.getItem("groupsData")) || [];
    //append new form data to array
    storedGroupData.push(groupsData);
    //save updated array to local storage
    localStorage.setItem("groupsData", JSON.stringify(storedGroupData));
    addGroupToList(groupsData);
    closeAddGroupModal();
    toast.success("New group added");
    localStorage.removeItem("temporaryGroupData");
  };

  //update groupsData by adding new member to members array
  function addMemberToGroup(newMember) {
    // const updatedMembers = [...groupsData.members, newMember];
    setGroupsData((prevData) => ({
      ...prevData,
      members: [...prevData.members, newMember],
    }));
  }

  function deleteMemberFromGroup(memberToDelete) {
    setGroupsData((prevData) => ({
      ...prevData,
      members: prevData.members.filter(
        (member) => member.id !== memberToDelete.id
      ),
    }));
  }

  function createTemporaryGroupData() {
    localStorage.setItem(
      "temporaryGroupData",
      JSON.stringify({
        ...groupsData,
        members: groupsData.members,
      })
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-gray-800 bg-opacity-75">
      <div className="relative  w-[535px] h-[625px] rounded-md px-6 pt-6 bg-zinc-50 flex flex-col m-8 font-geologica  ">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
          <h1 className="p-0 text-md">New Group</h1>
          <p className="p-0 text-xs text-gray-400">*Mandatory fields</p>
        </div>

        <form
          onSubmit={addNewGroup}
          className="flex flex-col flex-1 gap-6 border-none "
        >
          <div className="flex flex-col">
            <div className="flex items-start">
              <img
                src="../../images/placeholder.jpg"
                className="border border-none rounded-full w-[80px] h-[80px] mr-4"
              />
              <div className="relative flex flex-col">
                <label className="text-sm">
                  Group name*
                  <input
                    className="w-full p-2 mt-1 text-left border rounded-md text-input-text border-input-border h-9"
                    type="text"
                    name="name"
                    value={groupsData.name}
                    onChange={handleChange}
                    maxLength={30}
                    required
                  />
                </label>
                <p className="text-xs text-gray-400">30 character max.</p>
                {renderGroupId()}
              </div>

              <div className="relative flex flex-col">
                <label className="ml-2 text-sm">
                  Allotted budget
                  <input
                    className="w-full p-2 mt-1 text-left border rounded-md text-input-text border-input-border h-9"
                    type="number"
                    step={0.01}
                    min={0.01}
                    max={1000000}
                    maxLength={7}
                    name="allottedBudget"
                    value={groupsData.allottedBudget}
                    onChange={handleChange}
                    onKeyDown={blockInvalidChar}
                    required
                  />
                </label>
                <p className="ml-2 text-xs text-gray-400">$1,000,000 max.</p>
              </div>
            </div>

            <label className="flex flex-col pt-4 text-sm ">
              Group description*
              <textarea
                className="w-full p-2 mt-1 text-left border rounded-md resize-none text-input-text border-input-border"
                name="description"
                value={groupsData.description}
                onChange={handleChange}
                maxLength={350}
                placeholder="Write your text here."
                required
                rows={3}
              />
            </label>

            <GroupTypeSelection
              handleChange={handleChange}
              groupsData={groupsData}
            />
            <AddMember
              addMemberToGroup={addMemberToGroup}
              groupMembers={groupsData.members}
            />
            <div className="flex items-center justify-between pb-4 mt-4 mb-4 border-b border-border">
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  createTemporaryGroupData();
                  closeAddGroupModal();
                  openLinkAddFriendModal();
                }}
                className="p-0 text-sm text-gray-400 underline hover:text-black "
              >
                Add new friends to your friend list
              </Link>
            </div>

            <div className="pb-12 mt-2 overflow-y-auto max-h-32">
              <MembersOnGroup
                groupMembers={groupsData.members}
                deleteMemberFromGroup={deleteMemberFromGroup}
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex items-center w-full p-4 bg-light-indigo place-content-end rounded-b-md">
              <button
                type={"button"}
                onClick={() => {
                  closeAddGroupModal();
                  localStorage.removeItem("temporaryGroupData");
                }}
                className="mr-2 text-sm"
              >
                Close
              </button>
              <button
                type={"submit"}
                className="px-3 py-2 text-sm rounded-lg hover:bg-hover bg-button text-light-indigo"
              >
                Create group
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
//Add proptypes validation for eslint
AddGroup.propTypes = {
  closeAddGroupModal: PropTypes.func.isRequired,
  openLinkAddFriendModal: PropTypes.func.isRequired,
};
