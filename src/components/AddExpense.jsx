import { useContext, useState } from "react";
import { AppContext } from "../App";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import ExpenseCategorySelection from "./ExpenseCategorySelection";
import { v4 as uuidv4 } from "uuid";
import ExpenseParticipant from "./ExpenseParticipant";

export default function AddExpense({ closeAddExpense, currentGroup }) {
  const { addExpenseToList } = useContext(AppContext);

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
        [selectOptionName]: event.value,
      }));
    } else {
      const { name, value } = event.target;
      setExpensesData((prevExpensesData) => ({
        ...prevExpensesData,
        [name]: value,
      }));
    }
  };

  const addNewExpense = (event) => {
    event.preventDefault();

    //get stored data from local storage or initialize array
    let storedExpenseData =
      JSON.parse(localStorage.getItem("expensesData")) || [];

    //append new form data to array
    storedExpenseData.push(expensesData);

    //save updated array to local storage
    localStorage.setItem("expensesData", JSON.stringify(storedExpenseData));
    addExpenseToList(expensesData);
    // closeAddExpense();
    toast.success("New expense added");

    setExpensesData({
      name: "",
      amount: "",
      date: generateDate(),
      category: null,
      description: "",
      id: uuidv4(),
      groupId: currentGroup.id,
      participants: [],
    });

    setSelectedParticipant(null);
    setResetSearchBar((prev) => !prev);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-800 bg-opacity-75">
      <div className="relative border w-[535px] h-[625px] rounded-md px-6 pt-6 bg-zinc-50 flex flex-col m-8 font-geologica">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
          <h1 className="p-0 text-md">New Expense</h1>
          <p className="p-0 text-xs text-gray-400">*Mandatory fields</p>
        </div>

        <form
          onSubmit={addNewExpense}
          className="flex flex-col flex-1 gap-6 border border-none"
        >
          <div className="flex flex-col">
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
            <div className="flex items-start pt-4 ">
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

            <label className="flex flex-col pt-4 text-sm ">
              Expense description*
              <textarea
                className="border border-gray-300 rounded-md h-[72px] w-full text-left mt-1 p-2 text-gray-500"
                name="description"
                value={expensesData.description}
                onChange={handleChange}
                required
              />
            </label>

            {/* TODO PLACEHOLDER */}
            <div className="pt-4 mb-auto">
              <p className="border border-gray-300 border-dashed rounded-md h-[72px] w-full text-left mt-1 p-2 text-gray-500">
                placeholder to add receipt
              </p>
            </div>
            <div className="pt-4 pb-2 mb-auto">
              <p>Add participants</p>
              <div className="flex items-center">
                <SearchBar
                  handleParticipantAdded={(participant) =>
                    setSelectedParticipant(participant)
                  }
                  purpose="participant" //specifies purpose of search bar is participant
                  groupMembers={currentGroup?.members || []}
                  resetSearchBar={resetSearchBar}
                />
                <button
                  onClick={addParticipant}
                  type="button"
                  className="ml-2 px-3 py-2 text-sm border-none rounded-lg h-9 hover:bg-hover bg-button text-light-indigo"
                >
                  Add
                </button>
              </div>

              <div className="overflow-y-auto max-h-14">
                <ExpenseParticipant
                  expensesData={expensesData}
                  deleteParticipant={deleteParticipant}
                  addOrUpdateParticipants={addOrUpdateParticipants}
                />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex items-center w-full p-4 bg-light-indigo place-content-end rounded-b-md">
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
  currentGroup: PropTypes.object.isRequired,
};
