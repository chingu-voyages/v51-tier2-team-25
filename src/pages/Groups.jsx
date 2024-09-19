import { useState } from "react";
import EditGroupForm from "../components/EditGroupForm";

export default function Groups() {

  const [isEditGroupFormModalOpen, setIsEditGroupFormModalOpen] = useState(false);

  function openEditGroupFormModal() {
    setIsEditGroupFormModalOpen(true)
  }

  function closeEditGroupFormModal() {
    setIsEditGroupFormModalOpen(false)
  }

  return (
    <div>
      <h1>Groups page</h1>
      <button onClick={openEditGroupFormModal} className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo">Setting</button>

      {isEditGroupFormModalOpen && (
        <EditGroupForm
          // group={group} // Pass the current group's data as props
          closeEditGroupFormModal={closeEditGroupFormModal}
        />
      )}
    </div>
  )
}
