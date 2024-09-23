import PropTypes from 'prop-types';
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import AddMember from "./AddMember";
import MembersOnGroup from "./MembersOnGroup";
export default function EditGroupForm({ group, closeEditGroupFormModal }) {
  const { updateGroup, deleteGroup } = useContext(AppContext); // Get groups and setter from context
  const navigate = useNavigate();

  // Temporary state for handling input changes
  const [tempGroupData, setTempGroupData] = useState({
    name: group.name || "",
    id: group.id,
    description: group.description || "",
    allottedBudget: group.allottedBudget || "",
    category: group.category || "",
    members: group.members || []
  });

  useEffect(() => {
     // This ensures the form is pre-filled with the group data when opened
    if (group) {
      setTempGroupData({
        name: group.name,
        id: group.id,
        description: group.description,
        allottedBudget: group.allottedBudget,
        category: group.category,
        members: group.members
      });
    }
  }, [group]);

  // Handle input changes in the temporary state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempGroupData({
      ...tempGroupData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateGroup(tempGroupData) // Call updateGroup from AppContext
    closeEditGroupFormModal(); // Close the form after saving changes
    toast(`Changes saved`);
  };

  const handleDelete = () => {
    const groupName = tempGroupData.name;
    deleteGroup(group.id); // Call deleteGroup with the group's ID
    closeEditGroupFormModal(); // Close the form after deletion
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative border border-black-100 w-[535px] h-[625px] rounded-md p-6 bg-white flex flex-col m-8 font-geologica">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-black-200">
          <h1 className="p-0 text-md">Editing Group</h1>
          <p className="p-0 text-xs text-gray-400">*Mandatory fields</p>
        </div>

        <form
          className="flex flex-col flex-1 gap-6 overflow-auto border border-none"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <div className='flex items-center'>
              <img src='./public/images/placeholder.jpg' className='border border-none rounded-full w-[80px] h-[80px] mr-4' alt="Group placeholder"/>
              <div className='relative flex flex-col'>
                  <label className="text-sm">
                  Group name*
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
                  <p className='absolute top-0 p-0 m-0 text-xs text-gray-400 right-8'>#{group.id}</p>
              </div>  

              <label className='ml-2 text-sm'>
                Allotted budget
                <input 
                  className='w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9'
                  type='number'
                  step='0.01'
                  min='0'
                  name='allottedBudget'
                  value={tempGroupData.allottedBudget}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <label className='flex flex-col pt-4 text-sm '>
              Group description*
              <textarea 
                className='border border-gray-300 rounded-md h-[72px] w-full text-left mt-1 p-2 text-gray-500'              
                name='description'
                value={tempGroupData.description}
                onChange={handleChange}
                required
              />
            </label>

            {/* TODO PLACEHOLDER */}
            <div className='pt-4 mb-auto'>
              <p className='text-gray-200'>placeholder</p>
            </div>

            <AddMember
              addMemberToGroup={addMemberToGroup}
              groupMembers={tempGroupData.members}
            />
            <MembersOnGroup
              groupMembers={tempGroupData.members}
              deleteMemberFromGroup={deleteMemberFromGroup}
            />

            <div className="absolute bottom-0 left-0 right-0 flex items-center w-full p-4 bg-light-indigo place-content-end ">
              <button
                type="button"
                onClick={closeEditGroupFormModal}
                className="mr-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-2 mr-2 text-sm bg-red-600 border-none rounded-lg hover:bg-red-800 text-light-indigo"
              >
                Delete group
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
      );
}

EditGroupForm.propTypes = {
  group: PropTypes.object.isRequired,
  closeEditGroupFormModal: PropTypes.func.isRequired,
};