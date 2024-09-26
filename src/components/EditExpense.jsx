import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';
import SearchBar from "./SearchBar";

export default function EditExpense({ closeEditExpense, expense }) {
  const { updateExpenseInList} = useContext(AppContext); 
  const [expenseData, setExpenseData] = useState({
        name: "",
        amount: "",
        date: "", // Keep the date unchanged
        category: "",
        description: "",
        id: "",
  });

  useEffect(() => {
    if(expense){
    setExpenseData(expense);
    }
  }, [expense]);

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

    const generateDate = () => {
    const date = new Date();
    return date.toLocaleDateString();
  };

// Satomi's part
//   const deleteExpense = () => {
//     closeEditExpense();
//     toast("Expense deleted successfully");
//   };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative border w-[535px] h-[625px] rounded-md px-6 pt-6 bg-zinc-50 flex flex-col m-8 font-geologica">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
          <h1 className="text-md p-0">Edit Expense</h1>
          <p className="p-0 text-xs text-gray-400">*Mandatory fields</p>
        </div>
        
        <form 
        onSubmit={saveChanges} 
        className="flex flex-col flex-1 gap-6 overflow-auto border border-none">
            <div className="flex flex-col">
            <div className="flex items-center">
            <div className="relative flex flex-col">
          <label className="text-sm">
            Expense name*
            <input
              className="w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9"
              type="text"
              name="name"
              value={expenseData.name}
              onChange={handleChange}
              maxLength="30"
              required
            />
          </label>
          </div>

          <label className='ml-2 text-sm'>
            Amount*
            <input 
                className='w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9'
                type='number'
                step='0.01'
                min='0'
                name='amount'
                value={expenseData.amount}
                onChange={handleChange}
                required
              />
          </label>
          </div>
          <div className="flex items-start justify-between pt-4">
              <div className="flex flex-col">
                 <p className="text-sm">Date*</p>
               <p className="mt-4 text-sm text-input-text">{generateDate()}</p>
              </div>

          <label className="text-sm">
            Category*
            <select
                className='w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9'
                name='category'
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
          </div>

          <label className='flex flex-col pt-4 text-sm'>
              Expense Description*
              <textarea 
                className='border border-gray-300 rounded-md h-[72px] w-full text-left mt-1 p-2 text-gray-500'              
                name='description'
                value={expenseData.description}
                onChange={handleChange}
                required
              />
            </label>

   {/* Placeholder for receipt */}
            <div className="pt-4 mb-auto">
              <p className="border border-gray-300 border-dashed rounded-md h-[72px] w-full text-left mt-1 p-2 text-gray-500">
               Placeholder to add receipt
              </p>
            </div>

            <div className="pt-4 mb-auto">
              <p>Add members</p>
              <SearchBar />
            </div>


            <div className="absolute bottom-0 left-0 right-0 flex items-center w-full p-4 bg-light-indigo place-content-end">
              <button
                type="button"
                onClick={closeEditExpense}
                className="mr-2 text-sm"
              >
                Close
              </button>
              <button
                type="button"
                // onClick={handleDelete}
                className="px-3 py-2 text-sm border-none rounded-lg hover:bg-red-600 bg-red-500 text-white"
              >
                Remove expense
              </button>
              <button
                type="submit"
                className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo"
              >
                Edit Expense
              </button>
            </div>
            </div>
        </form>
      </div>
    </div>
  );
}

EditExpense.propTypes = {
    expense: PropTypes.object.isRequired,
    closeEditExpense: PropTypes.func.isRequired,
  };
