import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import ExpenseCategorySelection from "./ExpenseCategorySelection";
import ConfirmationModal from "./ConfirmationModal";
import ExpenseParticipant from "./ExpenseParticipant";
import { calculateAmountsToPay } from "../helpers/CalculateAmountsToPay";

export default function EditExpense({
  closeEditExpense,
  expense,
  currentGroup,
}) {
  const { updateExpenseInList, deleteExpenseInList } = useContext(AppContext);

  const [expensesData, setExpensesData] = useState({
    name: "",
    amount: "",
    date: "", // Keep the date unchanged
    category: "",
    description: "",
    id: "",
    participants: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmCloseOpen, setIsConfirmCloseOpen] = useState(false); //confirmation modal
  const [changesMade, setChangesMade] = useState(false); // Track if changes were made

  useEffect(() => {
    if (expense) {
      setExpensesData(expense);
    }
  }, [expense]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpensesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setChangesMade(true);
  };

  const handleCategoryChange = (selectedCategory) => {
    setExpensesData((prevData) => ({
      ...prevData,
      category: selectedCategory ? selectedCategory.value : "",
    }));
    setChangesMade(true);
  };

  const saveChanges = (event) => {
    event.preventDefault();

    const totalSharePercentage = expensesData.participants.reduce((total, participant) => {
      return total + (participant.sharePercentage || 0)
    }, 0)

    const hasZeroSharePercentage = expensesData.participants.some(participant => participant.sharePercentage === 0)

    if(!hasZeroSharePercentage && totalSharePercentage < 100) {
      toast.error("The total share percentage is less than 100%. Please adjust the shares.")
      return;
    } 

    if(totalSharePercentage > 100) {
      toast.error("Total share percentage cannot exceed 100%. Please adjust the shares.")
      return;
    }

    const { updatedShares } = calculateAmountsToPay(
      expensesData.participants,
      parseFloat(expensesData.amount)
    );

    let updatedExpensesData = {
      ...expensesData,
      participants: Object.values(updatedShares)
    };

    updateExpenseInList(updatedExpensesData);
    closeEditExpense();
    toast(`Expense ${expensesData.name} was updated successfully`);
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    const expenseName = expensesData.name;
    deleteExpenseInList(expense.id); // Call deleteGroup with the group's ID
    closeEditExpense(); // Close the form after deletion
    setIsModalOpen(false); // This closes the modal
    toast(`Expense ${expenseName} was deleted`);
  };

  const handleClose = () => {
    if (changesMade) {
      setIsConfirmCloseOpen(true); // Open confirmation modal
    } else {
      closeEditExpense();
    }
  };

  const confirmClose = () => {
    setIsConfirmCloseOpen(false);
    closeEditExpense();
  };

  const cancelClose = () => {
    setIsConfirmCloseOpen(false);
  };

  const deleteParticipant = (participantToDelete) => {
    setExpensesData((prevData) => ({
      ...prevData,
      participants: prevData.participants.filter(
        (participant) => participant.id !== participantToDelete.id
      ),
    }));
  };
  const addOrUpdateParticipant = (newParticipant) => {
    if (newParticipant) {
      const isParticipantIncluded = expensesData.participants.some(
        (participant) => participant.id === newParticipant.id
      );

      setExpensesData((prevData) => {
        const updatedParticipants = isParticipantIncluded
          ? prevData.participants.map(
              (participant) =>
                participant.id === newParticipant.id
                  ? newParticipant // Update the existing participant
                  : participant // Keep other participants unchanged
            )
          : [...prevData.participants, newParticipant]; // Add the new participant

        return { ...prevData, participants: updatedParticipants };
      });

      // Display appropriate toast message based on the action
      // toast(
      //   isParticipantIncluded
      //     ? "Participant updated successfully"
      //     : "Participant added successfully"
      // );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-gray-800 bg-opacity-75">
      <div className="relative w-[535px] h-auto rounded-md px-6 pt-6  bg-zinc-50 flex flex-col m-8 font-geologica">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
          <h1 className="p-0 text-md">Edit Expense</h1>
          <p className="p-0 text-xs text-gray-400">*Mandatory fields</p>
        </div>

        <form
          onSubmit={saveChanges}
          className="flex flex-col flex-1 gap-6 border border-none"
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
              <div className="flex items-start pt-4">
                <div className="flex flex-col w-full">
                  <p className="text-sm">Date*</p>
                  <p className="pl-2 mt-4 text-sm text-input-text">
                    {expensesData.date}
                  </p>
                </div>
                <div className="flex flex-col w-full">
                  <p className="w-full pb-1 text-sm">Category*</p>
                  <ExpenseCategorySelection
                    handleChange={handleCategoryChange}
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
                    {expensesData.date}
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-full mb-4">
                <p className="w-full pb-1 text-sm">Category*</p>
                <ExpenseCategorySelection
                  handleChange={handleCategoryChange}
                  category={expensesData.category}
                />
              </div>
            </div>

            <label className="flex flex-col mb-4 text-sm">
              Expense Description*
              <textarea
                className="w-full p-2 mt-1 text-left border rounded-md resize-none text-input-text border-input-border"
                name="description"
                value={expensesData.description}
                onChange={handleChange}
                required
              />
            </label>

            <div className="mb-4">
              <p className="flex flex-col text-sm md:pt-4">Attachments</p>
              <p className="border border-gray-300 border-dashed rounded-md h-[72px] w-full text-left mt-1 p-2 text-gray-500 text-sm">
                Placeholder to add receipt
              </p>
            </div>

            <div className="mb-4 border-b md:pt-4 md:mb-auto border-border">
              <p className="flex flex-col mb-1 text-sm md:pt-4">
                Add participants
              </p>
              <div className="flex items-center mb-4">
                <SearchBar
                  handleParticipantAdded={(participant) => {
                    // console.log("Part selcted from search bar in editexpnse:", participant)
                    addOrUpdateParticipant(participant);
                  }}
                  purpose="participant" //specifies purpose of search bar is participant
                  groupMembers={currentGroup.members}
                />
              </div>
            </div>

            <div className="flex items-start">
              <div></div>
              <p className="text-xs md:mt-4 text-button">
                A value of 0 means an equal share, while any other number sets
                the member&apos;s contribution at x%, with the rest split among the
                others unless specified otherwise.
              </p>
            </div>

            <div className="pb-6 mt-2 overflow-y-auto md:pb-12">
              <ExpenseParticipant
                expensesData={expensesData}
                deleteParticipant={deleteParticipant}
                addOrUpdateParticipants={addOrUpdateParticipant}
              />
            </div>

            <div className="flex items-center w-[calc(100%+48px)] -ml-6 p-4 mt-auto bg-light-indigo place-content-end rounded-b-md">
              <button
                type="button"
                onClick={handleClose}
                className="mr-2 text-sm"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="hidden px-3 py-2 mr-2 text-sm text-white bg-red-500 border-none rounded-lg md:block hover:bg-red-600"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="block p-2 mr-2 text-white bg-red-500 border-none rounded-lg md:hidden hover:bg-red-600"
              >
                <img src="../../images/Delete.svg" className="w-4 h-4" />
              </button>
              <button
                type="submit"
                className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
        title="Delete Expense?"
        message={
          <>
            Are you sure you want to delete the expense <span className="font-bold">{expensesData.name}</span>?
            Any money accumulated so far will be refunded to the respective members.
          </>
        }
        confirmButtonText="Delete Expense"
      />

      <ConfirmationModal
        isOpen={isConfirmCloseOpen}
        onConfirm={confirmClose}
        onCancel={cancelClose}
        title="Close Overlay?"
        message="Are you sure you want to close this overlay? All entered information will be lost."
        confirmButtonText="Close Without Saving"
      />
    </div>
  );
}

EditExpense.propTypes = {
  expense: PropTypes.object.isRequired,
  closeEditExpense: PropTypes.func.isRequired,
  currentGroup: PropTypes.object.isRequired,
};