import { useContext, useState, useRef } from "react";
import { AppContext } from "../App";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import ExpenseCategorySelection from "./ExpenseCategorySelection";
import { v4 as uuidv4 } from "uuid";
import ExpenseParticipant from "./ExpenseParticipant";
import { calculateAmountsToPay } from "../helpers/CalculateAmountsToPay";
import ReceiptManagement from "./ReceiptManagement";

export default function AddExpense({ closeAddExpense, currentGroup }) {
  const { addExpenseToList } = useContext(AppContext);
  const receiptManagementRef =useRef()
  const [uploading, setUploading] = useState(false);

  //Generate today's date
  const generateDate = () => {
    const date = new Date();
    // console.log(date)
    const formatDate = date.toLocaleDateString();
    return formatDate;
  };

  // Initialize state for expensesData
  const [expensesData, setExpensesData] = useState({
    name: "",
    amount: "",
    date: generateDate(),
    category: null,
    description: "",
    id: uuidv4(),
    groupId: currentGroup.id,
    participants: [],
  });

  //Temp state to hold participant
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [resetSearchBar, setResetSearchBar] = useState(false);
  
  // Handle input changes and updates form data state
  const handleChange = (event, selectOptionName) => {
    if (selectOptionName) {
      setExpensesData((prevExpensesData) => ({
        ...prevExpensesData,
        [selectOptionName]: event.value || event,
      }));
    } else {
      const { name, value } = event.target;
      setExpensesData((prevExpensesData) => ({
        ...prevExpensesData,
        [name]: value,
      }));
    }
  };

  const addNewExpense = async(event) => {

    console.log("addNewExpense triggered")    
    event.preventDefault();
    setUploading(true)

    // Handle receipt upload
    try{
      console.log("Checking for receiptManagementRef");
      //Trigger receipt upload vai ref to ReceiptManagement
      if (receiptManagementRef.current){
        console.log("receiptManagementRef found, uploading receipts...");
        try{
          await receiptManagementRef.current.uploadReceiptsToFirebase()
          console.log("Receipts uploaded successfully");
        }catch(uploadError){
          console.error("Error uploading receipts:", uploadError);
          throw uploadError;
        }        
      }else{
        console.log("No receiptManagementRef found, skipping receipt upload");
      }

      console.log("Preparing to save expense data...");

      // Calculate total share percentage
      const totalSharePercentage = expensesData.participants.reduce((total, participant) => {
        return total + (participant.sharePercentage || 0)
      }, 0)

      const allParticipantsHaveShare = expensesData.participants.every(participant => participant.sharePercentage != undefined)

      // Validate share percentages
      if(allParticipantsHaveShare && totalSharePercentage < 100) {
        toast.error("The total share percentage is less than 100%. Please adjust the shares.")
        return;
      } 
  
      if(totalSharePercentage > 100) {
        toast.error("Total share percentage cannot exceed 100%. Please adjust the shares.")
        return;
      }
      
      // Prepare participants for the expense data
      const updatedParticipants = expensesData.participants.map((participant) => ({
        ...participant,
        sharePercentage: participant.sharePercentage || 0,
        isPaid: false,
      })); 

      // Prepare participants for the expense data
      const { updatedShares } = calculateAmountsToPay(
        updatedParticipants,
        parseFloat(expensesData.amount)
      );

      let updatedExpensesData = {
        ...expensesData,
        participants: Object.values(updatedShares)
      };

      //get stored data from local storage or initialize array
      let storedExpenseData = JSON.parse(localStorage.getItem("expensesData")) || [];
      console.log("Current stored expense data:", storedExpenseData);

      //append new form data to array
      console.log("Adding new expense to stored data:", expensesData);
      storedExpenseData.push(updatedExpensesData);

      // Save updated array to local storage
      console.log("Saving updated expense data to localStorage");
      localStorage.setItem("expensesData", JSON.stringify(storedExpenseData));

      //save updated array to local storage
      console.log("Adding expense to list");
      addExpenseToList(updatedExpensesData);

      console.log("Expense added successfully");
      toast.success("New expense added");

      // Reset form data
      console.log("Resetting form data");
      setExpensesData({
        name: "",
        amount: "",
        date: generateDate(),
        category: "",
        description: "",
        id: uuidv4(),
        groupId: currentGroup.id,
        participants: [],
      });
      setSelectedParticipant(null);
      setResetSearchBar((prev) => !prev);

      console.log("Closing add expense form");
      closeAddExpense();

    } catch (error){
      console.error("Error in addNewExpense:", error);
      toast.error('Failed to add expense')      
    } finally  {
        setUploading(false)
        console.log("addNewExpense completed");
    }
  };

  const addParticipant = () => {
    if (selectedParticipant) {
      const isSelectedParticipantIncluded =
        expensesData.participants.includes(selectedParticipant);
      if (isSelectedParticipantIncluded) {
        toast("Friend is already included");
        return;
      }
      setExpensesData((prevData) => ({
        ...prevData,
        participants: [...prevData.participants, selectedParticipant],
      }));
      setSelectedParticipant(null);
    }
  };

  function deleteParticipant(memberToDelete) {
    setExpensesData((prevData) => ({
      ...prevData,
      participants: prevData.participants.filter(
        (member) => member.id !== memberToDelete.id
      ),
    }));
  }

  function addOrUpdateParticipants(updatedParticipant) {
    setExpensesData((prevData) => {
      const isParticipantOnExpense = prevData.participants.some(
        (participant) => participant.id === updatedParticipant.id
      );

      const updatedParticipants = isParticipantOnExpense
        ? prevData.participants.map((participant) =>
            participant.id === updatedParticipant.id
              ? updatedParticipant
              : participant
          )
        : [...prevData.participants, updatedParticipants];
      return { ...prevData, participants: updatedParticipants };
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-gray-800 bg-opacity-75">
      <div className="relative w-full max-w-[535px] sm:w-11/12 md:w-10/12 lg:w-3/4 xl:w-[535px] h-auto rounded-md px-6 pt-6 bg-zinc-50 flex flex-col m-4 font-geologica">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
          <h1 className="p-0 text-md">New Expense</h1>
          <p className="p-0 text-xs text-gray-400">*Mandatory fields</p>
        </div>

        <form
          onSubmit={addNewExpense}
          className="flex flex-col flex-1 gap-6 border-none"
        >
          <div className="flex flex-col">
            {/* Wider screen version */}
            <div className="hidden md:block">
              <div className="flex items-start">
                <div className="relative flex flex-col w-full">
                  <label className="text-sm">
                    Expense name*
                    <input
                      className="w-full p-2 mt-1 text-left border rounded-md text-input-text border-input-border h-9"
                      type="text"
                      name="name"
                      value={expensesData.name}
                      onChange={handleChange}
                      maxLength={30}
                      required
                    />
                  </label>
                </div>

                <label className="ml-2 text-sm">
                  Amount*
                  <input
                    className="w-full p-2 mt-1 text-left border rounded-md text-input-text border-input-border h-9"
                    type="number"
                    step={0.01}
                    min={0.01}
                    name="amount"
                    value={expensesData.amount}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="flex items-start my-4 ">
                <div className="flex flex-col w-full">
                  <p className="text-sm">Date*</p>
                  <p className="pl-2 mt-4 text-sm text-input-text">
                    {generateDate()}
                  </p>
                </div>

                <div className="flex flex-col w-full">
                  <p className="w-full pb-1 text-sm">Category*</p>
                  <ExpenseCategorySelection
                    handleChange={handleChange}
                    category={expensesData.category}
                  />
                </div>
              </div>
            </div>
            {/* Mobile screen version */}
            <div className="block md:hidden">
              <div className="relative flex flex-col w-full mb-4">
                <label className="text-sm">
                  Expense name*
                  <input
                    className="w-full p-2 mt-1 text-left border rounded-md text-input-text border-input-border h-9"
                    type="text"
                    name="name"
                    value={expensesData.name}
                    onChange={handleChange}
                    maxLength={30}
                    required
                  />
                </label>
              </div>

              <div className="flex mb-4">
                <label className="w-full text-sm">
                  Amount*
                  <input
                    className="w-full p-2 mt-1 text-left border rounded-md text-input-text border-input-border h-9"
                    type="number"
                    step={0.01}
                    min={0.01}
                    name="amount"
                    value={expensesData.amount}
                    onChange={handleChange}
                    required
                  />
                </label>
                <div className="flex flex-col w-full ml-2">
                  <p className="text-sm">Date*</p>
                  <p className="mt-4 text-sm text-input-text">
                    {generateDate()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-full mb-4">
                <p className="w-full pb-1 text-sm">Category*</p>
                <ExpenseCategorySelection
                  handleChange={handleChange}
                  category={expensesData.category}
                />
              </div>
            </div>

            <label className="flex flex-col mb-4 text-sm">
              Expense description*
              <textarea
                className="w-full p-2 mt-1 text-left border rounded-md resize-none text-input-text border-input-border"
                name="description"
                value={expensesData.description}
                onChange={handleChange}
                required
              />
            </label>

            {/* TODO PLACEHOLDER */}
            <div className="mb-4">
                <ReceiptManagement                 
                  expenseId={expensesData.id}
                  ref={receiptManagementRef}
                />              
            </div>
            
            <div className="pb-2 mb-auto">
              <p className="text-sm">Add participants</p>
              <div className="flex items-center mt-1">
                <SearchBar
                  handleParticipantAdded={(participant) =>{
                    // console.log('participant selected from searchbar in addexpesne:', participant)
                    setSelectedParticipant(participant)
                  }}
                  purpose="participant" //specifies purpose of search bar is participant
                  groupMembers={currentGroup?.members || []}
                  resetSearchBar={resetSearchBar}
                />
                <button
                  onClick={addParticipant}
                  type="button"
                  className="px-3 py-2 ml-2 text-sm border-none rounded-lg h-9 hover:bg-hover bg-button text-light-indigo"
                >
                  Add
                </button>
              </div>

              <div className="pb-6 mt-2 overflow-y-auto md:pb-12">
                <ExpenseParticipant
                  expensesData={expensesData}
                  deleteParticipant={deleteParticipant}
                  addOrUpdateParticipants={addOrUpdateParticipants}
                />
              </div>
            </div>

            <div className="flex items-center w-[calc(100%+48px)] -ml-6 p-4 mt-auto bg-light-indigo place-content-end rounded-b-md">
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
                disabled={uploading}
              > 
                {uploading ? 'Uploading...': 'Create expense'} 
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
  currentGroup: PropTypes.object.isRequired,
};
