import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';

export default function EditExpense({ closeEditExpense, expenseToEdit }) {
  const { updateExpenseInList } = useContext(AppContext); 
  const [expenseData, setExpenseData] = useState(expenseToEdit);

  useEffect(() => {
    setExpenseData(expenseToEdit);
  }, [expenseToEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveChanges = (event) => {
    event.preventDefault();
    updateExpenseInList(expenseData);
    closeEditExpense();
    toast("Expense updated successfully");
  };

// Satomi's part
//   const deleteExpense = () => {
//     closeEditExpense();
//     toast("Expense deleted successfully");
//   };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative border w-[535px] h-[625px] rounded-md px-6 pt-6 bg-zinc-50 flex flex-col m-8">
        <div className="flex items-center justify-between pb-4 mb-5 border-b">
          <h1 className="text-md">Edit Expense</h1>
        </div>
        
        <form onSubmit={saveChanges} className="flex flex-col flex-1 gap-6">
          <label className="text-sm">
            Expense name*
            <input
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              type="text"
              name="name"
              value={expenseData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="text-sm">
            Amount*
            <input
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              type="number"
              name="amount"
              value={expenseData.amount}
              onChange={handleChange}
              required
            />
          </label>

          <label className="text-sm">
            Category*
            <select
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              name="category"
              value={expenseData.category}
              onChange={handleChange}
              required
            >
              <option value=''>--</option>
              <option value='cat1'>Category-1</option>
              <option value='cat2'>Category-2</option>
              <option value='cat3'>Category-3</option>
            </select>
          </label>

          <label className="text-sm">
            Expense description*
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              name="description"
              value={expenseData.description}
              onChange={handleChange}
              required
            />
          </label>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeEditExpense}
              className="text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
            //   onClick={deleteExpense}
              className="px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete Expense
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditExpense.propTypes = {
  closeEditExpense: PropTypes.func.isRequired,
  expenseToEdit: PropTypes.object.isRequired,
};
