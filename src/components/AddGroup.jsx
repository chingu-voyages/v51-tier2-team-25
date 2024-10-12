import { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../App";
import PropTypes from "prop-types";
import AddMember from "./AddMember";
import MembersOnGroup from "./MembersOnGroup";
import GroupTypeSelection from "./GroupTypeSelection";
import { Link, useNavigate } from "react-router-dom";
import AvatarManagement from '../components/AvatarManagement';

// eslint-disable-next-line react/prop-types

export default function AddGroup({
  closeAddGroupModal,
  openLinkAddFriendModal,
}) {

  const { addGroupToList, mainUser, showNotification } = useContext(AppContext);
  const modalRef = useRef()
  const navigate = useNavigate()
  const [resetSearchBar, setResetSearchBar] = useState(false); 

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
      ? {...temporaryGroupData,
        members:[]
      }
      : {
          avatar:"",
          name: "",
          id: generateGroupId(),
          description: "",
          allottedBudget: "",
          remainingBudget: "",
          members: [],
          groupType: "",
          expenses: [],
        }
  );

  //Close modals when click outside of modal
  useEffect(()=>{  
    const handleClickOutside = (e) =>{      
      if (modalRef.current && !modalRef.current.contains(e.target)){
        closeAddGroupModal()
      }    
    }
      document.body.addEventListener('mousedown',handleClickOutside)
      return () => {
        document.body.removeEventListener('mousedown',handleClickOutside)
      }    
  }, [closeAddGroupModal])

  //render groupID to be visible on form
  const renderGroupId = () => {
    return groupsData.id ? (
      <p className="absolute top-0 p-0 m-0 text-xs text-gray-400 md:right-8 right-1">
        #{groupsData.id}
      </p>
    ) : null;
  };

  // Handle input changes and updates form data state
  const handleChange = (event) => {
    const { name, value, type } = event.target;

    //check if value is empty or contains only spaces
    if (value.trim() === "" && value.length > 0) {
      showNotification("Input cannot be empty or contain only spaces",'error');
      return;
    }

    //check if value exceeds max allowed
    if (type === "number") {
      const newValue = parseFloat(value);

      if (!isNaN(newValue) && newValue > 1000000) {
        showNotification("Alloted budget cannot exceed $1,000,000",'error');
        return;
      }
    }

    setGroupsData((prevGroupsData) => ({
      ...prevGroupsData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (newAvatar) => {
    setGroupsData((prev) => ({
      ...prev,
      avatar: newAvatar, // Update the avatar in the groupsData state
    }));
  };  

  const addNewGroup = (event) => {
    event.preventDefault();

    const budgetRegex = /^(0|[1-9]\d*)(\.\d+)?$/;

    if (!budgetRegex.test(groupsData.allottedBudget)) {
      showNotification("Allotted budget must be a valid number", 'error');
      return;
    }

    if (groupsData.groupType === "") {
      showNotification("Please select a Group type", 'error');
      return;
    }

    // Ensure mainUser is always the first member
  const updatedMembers = [mainUser, ...groupsData.members.filter(member => member.id !== mainUser.id)]

    const newGroupData = {
      ...groupsData,
      remainingBudget: Number(groupsData.allottedBudget), 
      members: updatedMembers
    };

    addGroupToList(newGroupData);
    navigate(`/group/${groupsData.id}`)
    closeAddGroupModal();    
    showNotification("New group added",'success');
    localStorage.removeItem("temporaryGroupData");
  };

  //update groupsData by adding new member to members array
  function addMemberToGroup(newMember) {
    setGroupsData((prevData) => ({
      ...prevData,
      members: [...prevData.members, {
        ...newMember,
        avatar: newMember.avatar || "/images/Profile.svg" // Ensure avatar is included
      }],
    }));
    setResetSearchBar((prev) => !prev);
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
    const updatedGroupData = {
      ...groupsData,
      members: groupsData.members.map(member => ({
        ...member,
        avatar: member.avatar || "/images/Profile.svg" // Ensure avatar is included
      })),
    };
  
    // Store the updated data in localStorage
    localStorage.setItem("temporaryGroupData", JSON.stringify(updatedGroupData));
  }
  

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-gray-800 bg-opacity-75">
      <div ref={modalRef} className="relative w-full max-w-[535px] sm:w-11/12 md:w-10/12 lg:w-3/4 xl:w-[535px] h-auto rounded-md px-6 pt-6 bg-zinc-50 flex flex-col m-4 font-geologica">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
          <h1 className="p-0 text-md">New Group</h1>
          <p className="p-0 text-xs text-gray-400">*Mandatory fields</p>
        </div>

        <form
          onSubmit={addNewGroup}
          className="flex flex-col flex-1 gap-6 border-none "
        >
          <div className="flex flex-col">
            <div className="flex flex-col md:items-start md:flex-row">
              <div className='object-cover w-32 h-32 rounded-full'>
                <AvatarManagement 
                  avatar={groupsData.avatar}
                  onAvatarChange={handleAvatarChange}
                  showText={false} 
                  isEditable={true}
                /> 
              </div>

              <div className="relative flex flex-col">
                <label className="text-sm">
                  Group name*
                  <input
                    className="w-full p-2 text-left border rounded-md md:mt-1 text-input-text border-input-border h-9"
                    type="text"
                    name="name"
                    value={groupsData.name}
                    onChange={handleChange}
                    maxLength={30}
                    required
                  />
                </label>
                <p className="mb-4 text-xs text-gray-400 md:mb-0">30 character max.</p>
                {renderGroupId()}
              </div>

              <div className="relative flex flex-col">
                <label className="text-sm md:ml-2">
                  Allotted budget
                  <input
                    className="w-full p-2 text-left border rounded-md md:mt-1 text-input-text border-input-border h-9"
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
                <p className="mb-4 text-xs text-gray-400 md:ml-2 md:mb-0">$1,000,000 max.</p>
              </div>
            </div>

            <label className="flex flex-col text-sm md:pt-4">
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
              resetSearchBar={resetSearchBar}
            />
            <div className="flex items-center justify-between pb-4 mt-4 mb-4 border-b border-border">
            <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  createTemporaryGroupData();                  
                  openLinkAddFriendModal();
                }}
                className="p-0 text-sm text-gray-400 underline hover:text-black "
              >
                Add new friends to your friend list
              </Link>

            </div>

            <div className="pb-6 mt-2 overflow-y-auto md:pb-12">
              <MembersOnGroup
                groupMembers={groupsData.members}
                deleteMemberFromGroup={deleteMemberFromGroup}
              />
            </div>

            <div className="flex items-center w-[calc(100%+48px)] -ml-6 p-4 mt-auto bg-light-indigo place-content-end rounded-b-md">
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
                className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo"
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
  isEditable: PropTypes.bool
};
