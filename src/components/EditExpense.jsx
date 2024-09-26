import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';
import SearchBar from "./SearchBar";
import ExpenseCategorySelection from './ExpenseCategorySelection'
import DeleteExpenseModal from "./DeleteExpenseModal";


export default function EditExpense({ closeEditExpense, expense }) {
  const { updateExpenseInList, deleteExpenseInList } = useContext(AppContext); 

  const [expenseData, setExpenseData] = useState({
        name: "",
        amount: "",
        date: "", // Keep the date unchanged
        category: "",
        description: "",
        id: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    const expenseName = expenseData.name;
    deleteExpenseInList(expense.id); // Call deleteGroup with the group's ID
    closeEditExpense(); // Close the form after deletion
    setIsModalOpen(false); // This closes the modal
    toast(`Expense ${expenseName} was deleted`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative border w-[535px] h-[625px] rounded-md px-6 pt-6 bg-zinc-50 flex flex-col m-8 font-geologica">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
          <h1 className="p-0 text-md">Edit Expense</h1>
          <p className="p-0 text-xs text-gray-400">*Mandatory fields</p>
        </div>
        
        <form 
        onSubmit={saveChanges} 
        className="flex flex-col flex-1 gap-6 border border-none">
          <div className="flex flex-col">
            <div className="flex items-start">
              <div className="relative flex flex-col w-full">
                <label className="text-sm">
                  Expense name*
                  <input
                    className="w-full p-2 mt-1 text-left border rounded-md text-input-text border-input-border h-9"
                    type="text"
                    name="name"
                    value={expenseData.name}
                    onChange={handleChange}
                    maxLength={30}
                    required
                  />
                </label>
              </div>

              <label className='ml-2 text-sm'>
                Amount*
                <input 
                    className='w-full p-2 mt-1 text-left border rounded-md text-input-text border-input-border h-9'
                    type='number'
                  step={0.01}
                  min={0.01}
                    name='amount'
                    value={expenseData.amount}
                    onChange={handleChange}
                    required
                  />
              </label>
          </div>
          <div className="flex items-start pt-4">
            <div className="flex flex-col w-full">
              <p className="text-sm">Date*</p>
              <p className="pl-2 mt-4 text-sm text-input-text">{generateDate()}</p>
            </div>
            <div className='flex flex-col w-full'>
              <p className='w-full pb-1 text-sm'>Category*</p>
              <ExpenseCategorySelection 
                handleChange={handleChange}
              />  
            </div>          
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


            <div className="absolute bottom-0 left-0 right-0 flex items-center w-full gap-2 p-4 bg-light-indigo place-content-end">
              <button
                type="button"
                onClick={closeEditExpense}
                className="text-sm"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 mr-2 text-sm text-white bg-red-500 border-none rounded-lg hover:bg-red-600"

              >
                Delete expense
              </button>
              <button
                type="submit"
                className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo"
              >
                Edit expense
              </button>
            </div>
            </div>
        </form>
      </div>

      <DeleteExpenseModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
        expenseName={expenseData.name}
      />
    </div>
  );
}

EditExpense.propTypes = {
    expense: PropTypes.object.isRequired,
    closeEditExpense: PropTypes.func.isRequired,
  };
