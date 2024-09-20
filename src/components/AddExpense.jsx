import { useContext, useState } from "react";
import { AppContext } from "../App";
import toast from "react-hot-toast";
import PropTypes from 'prop-types'

// eslint-disable-next-line react/prop-types


export default function AddExpense({ closeAddExpense }) {
  //I'm using context but we can use props
  const { addExpenseToList } = useContext(AppContext);

   //Maybe move this to a helper function also maybe use uuid library?
   const generateGroupId = () => {
    return Math.floor(10000 + Math.random() * 900000);
  };
  // const generateDate = () =>{
    
  // }
  
  // Initialize state for groupsData
  const [expensesData, setExpensesData] = useState({
    name: "",
    amount:"",
    date:"",
    category:"",
    description:'',
    id:generateGroupId(),
  });

  // Handle input changes and updates form data state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpensesData((prevExpensesData) => ({
      ...prevExpensesData,
      [name]: value,
    }));
  };

  const addNewExpense = (event) => {
    event.preventDefault();
    //get stored data from local storage or initialize array
    let storedExpenseData = JSON.parse(localStorage.getItem("expensesData")) || [];
    //append new form data to array
    storedExpenseData.push(expensesData);
    //save updated array to local storage
    localStorage.setItem("expensesData", JSON.stringify(storedExpenseData));
    addExpenseToList(expensesData);
    closeAddExpense();
    toast("New expense added");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative border border-black-100 w-[535px] h-[625px] rounded-md p-6 bg-zinc-50 flex flex-col m-8 font-geologica">
        
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-black-200">
          <h1 className="p-0 text-md">New Expense</h1>
          <p className="p-0 text-xs text-gray-400">*Mandatory fields</p>
        </div>
        
        <form
          onSubmit={addNewExpense}
          className="flex flex-col flex-1 gap-6 overflow-auto border border-none"
        >
          <div className="flex flex-col">
            <div className='flex items-center'>
              
              <div className='relative flex flex-col'>
                <label className="text-sm">
                Expense name*
                  <input
                    className="w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9"
                    type="text"
                    name="name"
                    value={expensesData.name}
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
                value={expensesData.amount}
                onChange={handleChange}
                required
              />
            </label>
            </div>
            <div className='flex items-center'>
              <label className='text-sm'>
                Date*
                <input 
                  className='w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9'
                  type='date'
                  name='date'
                  value={expensesData.date}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className='ml-2 text-sm'>
                Category*
                <select
                  className='w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9'
                  name='category'
                  value={expensesData.category}
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

            
            
            <label className='flex flex-col pt-4 text-sm '>
              Expense description*
              <textarea 
                className='border border-gray-300 rounded-md h-[72px] w-full text-left mt-1 p-2 text-gray-500'              
                name='description'
                value={expensesData.description}
                onChange={handleChange}
                required
              />
            </label>

            {/* TODO PLACEHOLDER */}
            <div className='pt-4 mb-auto'>
              <p className='border border-gray-300 rounded-md h-[72px] w-full text-left mt-1 p-2 text-gray-500'>placeholder to add receipt</p>
            </div>
            <div className='pt-4 mb-auto'>
              <p className='border border-gray-300 rounded-md h-[72px] w-full text-left mt-1 p-2 text-gray-500'>placeholder to add friends</p>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 flex items-center w-full p-4 bg-light-indigo place-content-end ">
              <button
                type={"button"}
                onClick={closeAddExpense}
                className="mr-2 text-sm"
              >
                Close
              </button>
              <button
                type={"submit"}
                className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo"
              >
                Create expense
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>     

  );
}
//Add proptypes validation for eslint
AddExpense.propTypes = {
  closeAddExpense: PropTypes.func.isRequired,
}
