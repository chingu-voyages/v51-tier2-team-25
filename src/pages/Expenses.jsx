import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { AppContext } from "../App";
import EditExpense from "../components/EditExpense";
import GetOwePaid from "../helpers/GetOwePaid";

export default function Expenses() {
  const { groupId } = useParams()
  const { expenses, groups } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [title, setTitle]= useState([])

  const currentGroup = groups.find(group=> group.id === Number(groupId))

  const filteredExpenses = expenses.filter(expense => expense.groupId === Number(groupId))

  const openEditExpense = (expense) => {
    setSelectedExpense(expense);
    setIsEditing(true);
  };

  const closeEditExpense = () => {
    setIsEditing(false);
    setSelectedExpense(null);
  };

  const openReceipt = () =>{
    //**TODO */
    console.log("Receipt Open")
  }

  
  const generateTitle = () =>{
    const formattedDate = new Date().toLocaleString('en-US', 
      {year: 'numeric', month:'long'})
    return(formattedDate)
  }

  useEffect(()=>{
    if(filteredExpenses.length > 0){
      const currentTitle = generateTitle()
      setTitle(currentTitle)
    }   
  }, [filteredExpenses])

  return (
    <div >      
      {filteredExpenses.length === 0 ? (
      <p>No expenses found.</p>
      ) : (
        <>
          {title && <p className="text-sm text-button">{title}</p>}
          {filteredExpenses.map((expense)=>(
            <div key={expense.id} className="flex items-center justify-between p-4 my-2 border border-gray-300 rounded-md bg-zinc-50">
              <div className='flex flex-col gap-2'>
                <div className="flex gap-2 bg-zinc-50">
                  <p className="text-sm font-bold">{expense.name}</p>
                  <p className="px-1 text-xs border rounded-md bg-light-indigo border-border">{expense.category}</p>
                </div>
                <p className="text-sm">Placeholder for leftover budget</p>
              </div>
              <div className='flex gap-4 text-sm'>
                <div className='flex flex-col gap-2'>
                  <GetOwePaid />             
                  <p>Placeholder people remaining</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="px-1 rounded-md hover:bg-gray-200" onClick={() => openReceipt}><img src="../../images/Ticket.svg" alt="Ticket" /></button>
                  <button type="button" className="px-1 rounded-md hover:bg-gray-200" onClick={() => openEditExpense(expense)}><img src="../../images/Edit.svg" alt="Edit" /></button>
                </div>   
              </div>
            </div>
          ))}  
        </>     
      )}

      {isEditing && selectedExpense && currentGroup &&(
        <EditExpense 
          expense={selectedExpense} 
          closeEditExpense={closeEditExpense}
          currentGroup={currentGroup}
        />
      )}
    </div>
  );
}
