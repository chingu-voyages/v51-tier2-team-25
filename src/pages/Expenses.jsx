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
    <div className="">
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        expenses.map((expense)=>(
          <div key={expense.id} className="flex items-center justify-between p-4 my-2 border border-gray-300 rounded-md">
          <div className="flex gap-2">
            <p className="text-sm font-bold">{expense.name}</p>
            <p className="text-sm">{expense.category}</p>
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
