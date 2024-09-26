import PropTypes from "prop-types";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import GroupTypeSelection from "./GroupTypeSelection";
import AddMember from "./AddMember";
import MembersOnGroup from "./MembersOnGroup";
<<<<<<< HEAD
import { Link } from "react-router-dom";

export default function EditGroupForm({
  group,
  closeEditGroupFormModal,
  openAddFriendModal,
}) {
=======
import DeleteGroupModal from './DeleteGroupModal';

export default function EditGroupForm({ group, closeEditGroupFormModal }) {
>>>>>>> 915fda74ff41088f5335f9065059c79d49752e31
  const { updateGroup, deleteGroup } = useContext(AppContext);
  const navigate = useNavigate();

  // Do not allow none numeric keys
  const blockInvalidChar = (e) => ['e','E','+','-'].includes(e.key) && e.preventDefault()

  // Temporary state for handling input changes
  const [tempGroupData, setTempGroupData] = useState({
    name: group.name || "",
    id: group.id,
    description: group.description || "",
    allottedBudget: group.allottedBudget || "",
    category: group.category || "",
    members: group.members || [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // This ensures the form is pre-filled with the group data when opened
    if (group) {
      setTempGroupData({
        name: group.name,
        id: group.id,
        description: group.description,
        allottedBudget: group.allottedBudget,
        category: group.category,
        members: group.members,
      });
    }
  }, [group]);

  // Handle input changes in the temporary state
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = value.trim();

    if (newValue === "" && value !== "") {
      toast("Input cannot be empty or contain only spaces");
<<<<<<< HEAD
    } else {
      // Update the state if the input is valid
      setTempGroupData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
=======
      return
    } 
    
    if(type === "number"){
      const newValue=parseFloat(value)

      if(!isNaN(newValue) && newValue > 1000000){
        toast("Alloted budget cannot exceed $1,000,000")
        return
      }
>>>>>>> 915fda74ff41088f5335f9065059c79d49752e31
    }
    // Update the state if the input is valid
    setTempGroupData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    updateGroup(tempGroupData); // Call updateGroup from AppContext
=======

    const budgetRegex = /^(0|[1-9]\d*)(\.\d+)?$/;

    if (!budgetRegex.test(tempGroupData.allottedBudget)) {
      toast("Allotted budget must be a valid number");
      return;
    }

    updateGroup(tempGroupData) // Call updateGroup from AppContext
>>>>>>> 915fda74ff41088f5335f9065059c79d49752e31
    closeEditGroupFormModal(); // Close the form after saving changes
    toast(`Changes saved`);
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
    setIsModalOpen(true);
    console.log("isModalOpen set to true");
  };

  // In the render method
console.log("Current isModalOpen state:", isModalOpen);

  const confirmDelete = () => {
    const groupName = tempGroupData.name;
    deleteGroup(group.id); // Call deleteGroup with the group's ID
    closeEditGroupFormModal(); // Close the form after deletion
    setIsModalOpen(false); // This closes the modal
    navigate("/");
    toast(`Group ${groupName} was deleted`);
  };

  function addMemberToGroup(newMember) {
    // const memberWithId = { ...newMember, id: generateGroupId() };
    setTempGroupData((prevData) => ({
      ...prevData,
      members: [...prevData.members, newMember],
    }));
  }

  function deleteMemberFromGroup(memberToDelete) {
    setTempGroupData((prevData) => ({
      ...prevData,
      members: prevData.members.filter(
        (member) => member.id !== memberToDelete.id
      ),
    }));
  }

  return (
    <div>
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-gray-800 bg-opacity-75">
      <div className="relative  w-[535px] h-[625px] rounded-md px-6 pt-6 bg-zinc-50 flex flex-col m-8 font-geologica overflow-y-auto">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
          <h1 className="p-0 text-md">Edit Group</h1>
          <p className="p-0 text-xs text-gray-400">*Mandatory fields</p>
        </div>

        <form
          className="flex flex-col flex-1 gap-6 border-none"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
<<<<<<< HEAD
            <div className="flex items-center">
=======
            <div className='flex items-start'>
>>>>>>> 915fda74ff41088f5335f9065059c79d49752e31
              <img
                src="../images/placeholder.jpg"
                className="border border-none rounded-full w-[80px] h-[80px] mr-4"
              />
              <div className="relative flex flex-col">
                <label className="text-sm">
                  Group name*
<<<<<<< HEAD
                  <input
                    className="w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9"
                    type="text"
                    name="name"
                    value={tempGroupData.name}
                    onChange={handleChange}
                    maxLength="30"
                    required
                  />
                </label>
                <p className="absolute top-0 p-0 m-0 text-xs text-gray-400 right-8">
                  #{group.id}
                </p>
              </div>

              <label className="ml-2 text-sm">
                Allotted budget
                <input
                  className="w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9"
                  type="number"
                  step="0.01"
                  min="0"
                  name="allottedBudget"
                  value={tempGroupData.allottedBudget}
                  onChange={handleChange}
                  required
                />
              </label>
=======
                    <input
                      className="w-full p-2 mt-1 text-left border rounded-md text-input-text border-input-border h-9"
                      type="text"
                      name="name"
                      value={tempGroupData.name}
                      onChange={handleChange}
                      maxLength={30}
                      required
                    />
                  </label>
                  <p className="text-xs text-gray-400">30 character max.</p>
                  <p className="absolute top-0 p-0 m-0 text-xs text-gray-400 right-8">#{tempGroupData.id}</p>
              </div>  

              <div className='relative flex flex-col'>
                  <label className='ml-2 text-sm'>
                  Allotted budget
                  <input 
                    className='w-full p-2 mt-1 text-left border rounded-md text-input-text border-input-border h-9'
                    type='number'
                    step={0.01}
                    min={0.01}
                    max={1000000}
                    maxLength={7}   
                    name='allottedBudget'
                    value={tempGroupData.allottedBudget}
                    onChange={handleChange}
                    onKeyDown={blockInvalidChar}
                    required
                  />
                </label>
                <p className="ml-2 text-xs text-gray-400">$1,000,000 max.</p>
              </div>
>>>>>>> 915fda74ff41088f5335f9065059c79d49752e31
            </div>

            <label className="flex flex-col pt-4 text-sm ">
              Group description*
<<<<<<< HEAD
              <textarea
                className="border border-gray-300 rounded-md h-[72px] w-full text-left mt-1 p-2 text-gray-500"
                name="description"
=======
              <textarea 
                className='w-full p-2 mt-1 text-left border rounded-md resize-none text-input-text border-input-border'              
                name='description'
>>>>>>> 915fda74ff41088f5335f9065059c79d49752e31
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
<<<<<<< HEAD
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border mt-4">
              <Link
                onClick={() => {
                  closeEditGroupFormModal();
                  openAddFriendModal();
                }}
                className="p-0 text-sm text-gray-400 underline  hover:text-black"
              >
                Add new friends to your friend list
              </Link>
            </div>
            <MembersOnGroup
              groupMembers={tempGroupData.members}
              deleteMemberFromGroup={deleteMemberFromGroup}
            />
=======
            <div className="pb-12 mt-2 overflow-y-auto max-h-32">
              <MembersOnGroup
                groupMembers={tempGroupData.members}
                deleteMemberFromGroup={deleteMemberFromGroup}
              />
            </div> 
>>>>>>> 915fda74ff41088f5335f9065059c79d49752e31

            <div className="absolute bottom-0 left-0 right-0 flex items-center w-full p-4 bg-light-indigo place-content-end ">
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
                className="px-3 py-2 mr-2 text-sm bg-red-600 rounded-lg hover:bg-red-800 text-light-indigo"
              >
                Delete group
              </button>
              <button
                type="submit"
                className="px-3 py-2 text-sm rounded-lg hover:bg-hover bg-button text-light-indigo"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
<<<<<<< HEAD
  );
}
=======
    <DeleteGroupModal
      isOpen={isModalOpen}
      onConfirm={confirmDelete}
      onCancel={() => setIsModalOpen(false)}
      groupName={tempGroupData.name}
    />
  </div>
  );
  }
>>>>>>> 915fda74ff41088f5335f9065059c79d49752e31

EditGroupForm.propTypes = {
  group: PropTypes.object.isRequired,
  closeEditGroupFormModal: PropTypes.func.isRequired,
  openAddFriendModal: PropTypes.func.isRequired,
};
