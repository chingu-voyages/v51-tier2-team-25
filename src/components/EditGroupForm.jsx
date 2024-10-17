import PropTypes from "prop-types";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import GroupTypeSelection from "./GroupTypeSelection";
import AddMember from "./AddMember";
import MembersOnGroup from "./MembersOnGroup";
import { Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import AvatarManagement from '../components/AvatarManagement';

export default function EditGroupForm({
  tempGroupData,
  setTempGroupData,
  closeEditGroupFormModal,
  openLinkAddFriendModal,
}) {
  const { updateGroup, deleteGroup, showNotification } = useContext(AppContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Do not allow none numeric keys
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  useEffect(() => {
    const savedGroupData = JSON.parse(localStorage.getItem("tempGroupData"));
    if (savedGroupData) {
      setTempGroupData(savedGroupData);
    }
  }, [setTempGroupData]);

  useEffect(() => {
    // Only update state if tempGroupData changes and save it to localStorage
    setTempGroupData((prevData) => {
      if (JSON.stringify(prevData) !== JSON.stringify(tempGroupData)) {
        localStorage.setItem("tempGroupData", JSON.stringify(tempGroupData));
        return { ...tempGroupData };
      }
      return prevData;
    });
  }, [tempGroupData, setTempGroupData]);

  // Handle input changes in the temporary state
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = value.trim();

    if (newValue === "" && value !== "") {
      showNotification("Input cannot be empty or contain only spaces", 'error');
      return;
    }

    if (type === "number") {
      const newValue = parseFloat(value);

      if (!isNaN(newValue) && newValue > 1000000) {
        showNotification("Alloted budget cannot exceed $1,000,000",'error');
        return;
      }
    }
    // Update the state if the input is valid
    setTempGroupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle avatar change for both group and members
  const handleAvatarChange = (newAvatar, memberId = null) => {
    if (memberId) {
      // Update specific member's avatar
      setTempGroupData((prev) => {
        const updatedMembers = prev.members.map((member) =>
          member.id === memberId ? { ...member, avatar: newAvatar } : member
        );
        const updatedGroup = {
          ...prev,
          members: updatedMembers,
        };
        localStorage.setItem("tempGroupData", JSON.stringify(updatedGroup));
        return updatedGroup;
      });
    } else {
      // Update group avatar
      setTempGroupData((prev) => {
        const updatedGroup = {
          ...prev,
          avatar: newAvatar,
        };
        localStorage.setItem("tempGroupData", JSON.stringify(updatedGroup));
        return updatedGroup;
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const budgetRegex = /^(0|[1-9]\d*)(\.\d+)?$/;

    if (!budgetRegex.test(tempGroupData.allottedBudget)) {
      showNotification("Allotted budget must be a valid number",'error');
      return;
    }

    const totalExpenses = tempGroupData.expenses.reduce((total, expense) => {
      return total + parseFloat(expense.amount); // Add each expense amount
    }, 0);
  
    const allottedBudget = parseFloat(tempGroupData.allottedBudget);
    const remainingBudget = allottedBudget - totalExpenses;

    const updatedGroupData = {
      ...tempGroupData,
      remainingBudget, // Update with calculated remaining budget
    };
  
    // Call the function to update the group data
    updateGroup(updatedGroupData);
    closeEditGroupFormModal(); // Close the form after saving changes
    showNotification(`Changes saved`,'success');
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  // In the render method
  // console.log("Current isModalOpen state:", isModalOpen);

  const confirmDelete = () => {
    const groupName = tempGroupData.name;
    deleteGroup(tempGroupData.id); // Call deleteGroup with the group's ID
    closeEditGroupFormModal(); // Close the form after deletion
    setIsModalOpen(false); // This closes the modal
    navigate("/");
    showNotification(`Group ${groupName} was deleted`, 'success');
  };

    // Add member to the group
    const addMemberToGroup = (newMember) => {
      //console.log("Adding member w/avatar:", newMember)
      setTempGroupData((prevData) => {
        const updatedGroup = {
          ...prevData,
          members: [
            ...prevData.members,
            {
              ...newMember,
              avatar: newMember.avatar || "../../images/Profile.svg", // Ensure avatar is included
            },
          ],
        };
        localStorage.setItem("tempGroupData", JSON.stringify(updatedGroup));
        return updatedGroup;
      });
    };
  

  // Delete member from the group
  const deleteMemberFromGroup = (memberToDelete) => {
    setTempGroupData((prevData) => {
      const updatedGroup = {
        ...prevData,
        members: prevData.members.filter(
          (member) => member.id !== memberToDelete.id
        ),
      };
      localStorage.setItem("tempGroupData", JSON.stringify(updatedGroup));
      return updatedGroup;
    });
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-gray-800 bg-opacity-75">
        <div className="relative w-full max-w-[535px] sm:w-11/12 md:w-10/12 lg:w-3/4 xl:w-[535px] h-auto rounded-md px-6 pt-6 bg-zinc-50 flex flex-col m-4 font-geologica">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
            <h1 className="p-0 text-md">Edit Group</h1>
            <p className="p-0 text-xs text-gray-400">*Mandatory fields</p>
          </div>

          <form
            className="flex flex-col flex-1 gap-6 border-none"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col ">
              <div className="flex flex-col md:items-start md:flex-row">
                <div className='object-cover w-32 h-32 rounded-full'>
                  <AvatarManagement 
                    avatar={tempGroupData.avatar}
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
                      value={tempGroupData.name}
                      onChange={handleChange}
                      maxLength={30}
                      required
                    />
                  </label>
                  <p className="mb-4 text-xs text-gray-400 md:mb-0">30 character max.</p>
                  <p className="absolute top-0 p-0 m-0 text-xs text-gray-400 md:right-8 right-1">
                    #{tempGroupData.id}
                  </p>
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
                      value={tempGroupData.allottedBudget}
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
                  value={tempGroupData.description}
                  onChange={handleChange}
                  maxLength={350}
                  placeholder="Write your text here."
                  required
                  rows={3}
                />
              </label>

              <GroupTypeSelection
                handleChange={handleChange}
                groupsData={tempGroupData}
              />

              <AddMember
                addMemberToGroup={addMemberToGroup}
                groupMembers={tempGroupData.members}
              />
              <div className="flex items-center justify-between pb-4 mt-4 mb-4 border-b border-border">
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  closeEditGroupFormModal();
                  openLinkAddFriendModal();  // Open the add friend modal
                }}
                className="p-0 text-sm text-gray-400 underline hover:text-black"
              >
                Add new friends to your friend list
              </Link>
              </div>
              <div className="pb-6 mt-2 overflow-y-auto md:pb-12">
                <MembersOnGroup
                  groupMembers={tempGroupData.members}
                  deleteMemberFromGroup={deleteMemberFromGroup}
                  handleAvatarChange={handleAvatarChange}
                />
              </div>

              <div className="flex items-center w-[calc(100%+48px)] -ml-6 p-4 mt-auto bg-light-indigo place-content-end rounded-b-md">
                <button
                  type="button"
                  onClick={closeEditGroupFormModal}
                  className="mr-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="hidden px-3 py-2 mr-2 text-sm text-white bg-red-500 border-none rounded-lg md:block hover:bg-red-600"
                >
                  Delete group
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="block p-2 mr-2 text-white bg-red-500 border-none rounded-lg md:hidden hover:bg-red-600"
                >
                  <img src="../../images/Delete.svg" alt="delete" className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
        title="Delete Group?"
        message={`Are you sure you want to delete the ${tempGroupData.name} group? 
            All open expenses will be removed, and any money accumulated so far will be refunded to the respective members.`}
        confirmButtonText="Delete Group"
      />
    </div>
  );
}

EditGroupForm.propTypes = {
  tempGroupData: PropTypes.object.isRequired,
  setTempGroupData: PropTypes.func.isRequired,
  closeEditGroupFormModal: PropTypes.func.isRequired,
  openLinkAddFriendModal: PropTypes.func.isRequired,
  isEditable: PropTypes.bool
};
