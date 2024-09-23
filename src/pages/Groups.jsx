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
      <div className='flex flex-col w-2/3 min-w-[785px] gap-6 font-geologica'>
        <div className='p-6 mt-12 border rounded-md border-border bg-zinc-50'>
          <div className='flex'>
            <img className='w-32 h-32 rounded-full' src='../images/placeholder.jpg'/>
            <div className="relative w-full pl-6">
              <div className='flex items-center justify-between gap-12'>
                <div className="flex item-center items-center">
                  <h1 className='text-2xl'>{currentGroup?.name}</h1>
                  <p className='pl-2 text-xs text-gray-600'>#{currentGroup?.id}</p>
                </div>
                <img className='h-4'src='../images/Edit.svg' onClick={openEditGroupFormModal}/>                      
              </div>
              <p className='pt-2 text-gray-600 text-s'>{currentGroup?.description}</p>  
            </div>            
          </div>                
          
          <div className='flex items-end pt-6'>

            <div className='flex items-center w-1/2'>
              <img className='w-8 h-8 rounded-full' src='../images/placeholder.jpg'/>
              <p className='pl-2 text-sm text-gray-500'># members</p>
            </div>

            <div className='flex items-center w-full gap-6 place-content-end'>
              <div className='flex flex-col'>
                <p  className='text-xs text-gray-500'>Allotted budget</p>
                <p className='text-sm, text-gray-950'>$ {currentGroup?.allottedBudget}</p>
              </div>

              <div className='flex flex-col'>
                <p className='text-xs text-gray-500'>Remaining</p>
                <p className='text-sm, text-gray-950'>$ placeholder</p>
              </div>

              <button 
                className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo"
                onClick={openAddExpense}>
                New expense
              </button>
            </div>
          

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
        <div className='w-full bg-gray-200 border border-gray-700 rounded-md h-36'>Placeholder for Expense/Statics Tabs</div>
        <div className='w-full bg-gray-200 border border-gray-700 rounded-md h-36'>Placeholder for Expense/Statics Display</div>
      </div>
      
    </>
  ) 

}
