import { useContext, useState } from "react";
import { AppContext } from "../App";
import EditExpense from "../components/EditExpense";

export default function Expenses() {
  const { expenses } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const openEditExpense = (expense) => {
    setSelectedExpense(expense);
    setIsEditing(true);
  };

  const closeEditExpense = () => {
    setIsEditing(false);
    setSelectedExpense(null);
  };

  return (
    <div className="p-4">
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        expenses.map((expense)=>(
          <div  key={expense.id} className="border border-gray-300 rounded-md p-4 flex justify-between items-center">
          <div className="flex flex-col">
            <h3>{expense.name}</h3>
            </div>
            <button type="button" className="hover:bg-gray-200" onClick={() => openEditExpense(expense)}><img src="../../images/Edit.svg" alt="Edit" /></button>
        </div>
        ))
      )}
         {isEditing && selectedExpense && (
        <EditExpense expense={selectedExpense} closeEditExpense={closeEditExpense} />
      )}
      </div>
  );
}
