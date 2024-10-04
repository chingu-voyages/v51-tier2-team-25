import PropTypes from "prop-types";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import GroupTypeSelection from "./GroupTypeSelection";
import AddMember from "./AddMember";
import MembersOnGroup from "./MembersOnGroup";
import { Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

export default function EditGroupForm({
  group,
  closeEditGroupFormModal,
  openAddFriendModal,
}) {
  const { updateGroup, deleteGroup } = useContext(AppContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Do not allow none numeric keys
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  // Temporary state for handling input changes
  const [tempGroupData, setTempGroupData] = useState({
    name: group.name || "",
    id: group.id,
    description: group.description || "",
    allottedBudget: group.allottedBudget || "",
    groupType: group.groupType || "",
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
        groupType: group.groupType,
        members: group.members

      });
    }
  }, [group]);

  // Handle input changes in the temporary state
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = value.trim();

    if (newValue === "" && value !== "") {
      toast("Input cannot be empty or contain only spaces");
      return;
    }

    if (type === "number") {
      const newValue = parseFloat(value);

      if (!isNaN(newValue) && newValue > 1000000) {
        toast("Alloted budget cannot exceed $1,000,000");
        return;
      }
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

    const budgetRegex = /^(0|[1-9]\d*)(\.\d+)?$/;

    if (!budgetRegex.test(tempGroupData.allottedBudget)) {
      toast("Allotted budget must be a valid number");
      return;
    }

    updateGroup(tempGroupData); // Call updateGroup from AppContext
    closeEditGroupFormModal(); // Close the form after saving changes
    toast(`Changes saved`);
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  // In the render method
  // console.log("Current isModalOpen state:", isModalOpen);

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
            <div className="flex flex-col">
              <div className="flex md:items-start flex-col md:flex-row">
                <img
                  src="../../images/placeholder.jpg"
                  className="border border-none rounded-full w-[80px] h-[80px] mr-4 mb-4 md:mb-0 self-center "
                />
                <div className="relative flex flex-col">
                  <label className="text-sm">
                    Group name*
                    <input
                      className="w-full p-2 md:mt-1 text-left border rounded-md text-input-text border-input-border h-9"
                      type="text"
                      name="name"
                      value={tempGroupData.name}
                      onChange={handleChange}
                      maxLength={30}
                      required
                    />
                  </label>
                  <p className="text-xs text-gray-400 mb-4 md:mb-0">30 character max.</p>
                  <p className="absolute top-0 p-0 m-0 text-xs text-gray-400 md:right-8 right-1">
                    #{tempGroupData.id}
                  </p>
                </div>

                <div className="relative flex flex-col">
                  <label className="md:ml-2 text-sm">
                    Allotted budget
                    <input
                      className="w-full p-2 md:mt-1 text-left border rounded-md text-input-text border-input-border h-9"
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
                  <p className="md:ml-2 text-xs text-gray-400 mb-4 md:mb-0">$1,000,000 max.</p>
                </div>
              </div>

              <label className="flex flex-col md:pt-4 text-sm">
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
                  onClick={() => {
                    closeEditGroupFormModal();
                    openAddFriendModal();
                  }}
                  className="p-0 text-sm text-gray-400 underline hover:text-black"
                >
                  Add new friends to your friend list
                </Link>
              </div>
              <div className="md:pb-12 pb-6 mt-2 overflow-y-auto">
                <MembersOnGroup
                  groupMembers={tempGroupData.members}
                  deleteMemberFromGroup={deleteMemberFromGroup}
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
                  className="hidden md:block px-3 py-2 mr-2 text-sm text-white bg-red-500 border-none rounded-lg hover:bg-red-600"
                >
                  Delete group
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="block md:hidden p-2 mr-2 text-white bg-red-500 border-none rounded-lg hover:bg-red-600"
                >
                  <img src="../../images/Delete.svg" className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 text-sm rounded-lg hover:bg-hover border-none bg-button text-light-indigo"
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
        message={(
          <>
            Are you sure you want to delete the <span className="font-bold">{tempGroupData.name}</span> group? 
            All open expenses will be removed, and any money accumulated so far will be refunded to the respective members.
          </>
        )}
        confirmButtonText="Delete Group"
      />
    </div>
  );
}

EditGroupForm.propTypes = {
  group: PropTypes.object.isRequired,
  closeEditGroupFormModal: PropTypes.func.isRequired,
  openAddFriendModal: PropTypes.func.isRequired,
};
