import PropTypes from "prop-types";

export default function Expenses({ expenseData, onEdit }) {
  return (
    <div className="border border-gray-300 rounded-md p-4 flex justify-between items-center">
      <div className="flex flex-col">
        <h3>{expenseData.name}</h3>
        <p>${expenseData.amount}</p>
      </div>
      <button onClick={onEdit} className="hover:bg-gray-200">
        Edit
        <img src="../../images/Edit.svg" alt="Edit" />
      </button>
    </div>
  );
}

Expenses.propTypes = {
  expenseData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};
