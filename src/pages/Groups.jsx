import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../App";
import EditGroupForm from "../components/EditGroupForm";
import AddExpense from "../components/AddExpense"

export default function Groups() {
  const { groupId } = useParams(); // Get the groupId from the URL
  const { groups } = useContext(AppContext); // Get all groups from context

  const [isEditGroupFormModalOpen, setIsEditGroupFormModalOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)
  const { addExpenseToList }= useContext(AppContext)

  // Find the current group based on the groupId
  const currentGroup = groups.find((group) => group.id === Number(groupId));
  
  function openEditGroupFormModal() {
    setIsEditGroupFormModalOpen(true)
  }

  function closeEditGroupFormModal() {
    setIsEditGroupFormModalOpen(false)
  }
  function closeAddExpense(){
    setIsAddExpenseOpen(false)
  }
  function openAddExpense(){
    setIsAddExpenseOpen(true)
  }
  return (
    <>
      <div className='flex flex-col w-2/3 min-w-[785px] border border-orange-400'>

        <div className='flex items-center'>
          <img className='w-32 h-32 rounded-full' src='../public/images/placeholder.jpg'/>
          <div className='flex'>
            <h1>{currentGroup?.name}</h1>
            <p>groupId</p>
            <p>group description</p>
            <img className='h-4'src='../public/images/Setting.png'/>
          </div>
          <button onClick={openEditGroupFormModal} className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo">Setting</button>

        </div>                
        
        <div className='flex items-end justify-between'>
          <div className='flex items-center'>
            <img className='w-8 h-8 rounded-full' src='../public/images/placeholder.jpg'/>
            <p># members</p>
          </div>
          <div className='flex flex-col'>
            <p>Allotted budget</p>
            <p>$ placeholder</p>
          </div>
          <div className='flex flex-col'>
            <p>Remaining</p>
            <p>$ placeholder</p>
          </div>
          <button 
            className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo"
            onClick={openAddExpense}>
            New expense
          </button>
          {isAddExpenseOpen && 
            <AddExpense 
              closeAddExpense ={closeAddExpense} 
              addExpenseToList={addExpenseToList}
            />
          }
          {isEditGroupFormModalOpen && (
            <EditGroupForm
              group={currentGroup} // Pass the current group's data as props
              closeEditGroupFormModal={closeEditGroupFormModal}
            />
          )}
        </div>
        
      </div>
      
    </>
  ) 

}
