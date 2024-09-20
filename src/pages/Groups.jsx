import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../App";
import EditGroupForm from "../components/EditGroupForm";

export default function Groups() {
  const { groupId } = useParams(); // Get the groupId from the URL
  const { groups } = useContext(AppContext); // Get all groups from context
  const [isEditGroupFormModalOpen, setIsEditGroupFormModalOpen] = useState(false);

  // Find the current group based on the groupId
  const currentGroup = groups.find((group) => group.id === Number(groupId));
  
  function openEditGroupFormModal() {
    setIsEditGroupFormModalOpen(true)
  }

  function closeEditGroupFormModal() {
    setIsEditGroupFormModalOpen(false)
  }

  return (
    <div>
      <h1>{currentGroup?.name} - Group page</h1>
      <button onClick={openEditGroupFormModal} className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo">Setting</button>

      {isEditGroupFormModalOpen && (
        <EditGroupForm
          group={currentGroup} // Pass the current group's data as props
          closeEditGroupFormModal={closeEditGroupFormModal}
        />
      )}
    </div>
  )
}
