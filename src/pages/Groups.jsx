import AddExpense from "../components/AddExpense"
import { useContext, useState } from 'react'
import { AppContext } from "../App"

export default function Groups() {

  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)
  const { addExpenseToList }= useContext(AppContext)
  
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
            <h1>Group Name</h1>
            <p>groupId</p>
            <p>group description</p>
            <img className='h-4'src='../public/images/Setting.png'/>
          </div>
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
        </div>
        
      </div>
      
    </>
  )
  
}
