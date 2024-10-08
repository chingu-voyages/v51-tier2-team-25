import { useContext } from "react";
import PropTypes from 'prop-types';
import { AppContext } from "../App";
import Expense from "../components/Expense";

export default function ExpensesUser() {
    const { groups } = useContext(AppContext);

    return (
        <div>
            {groups.map(group => (
                <div key={group.id}>
                    <h2 className="text-sm text-button">{group.name}</h2>
                    <div>
                        {group.expenses.slice(-2).map(expense => (
                            <Expense 
                                key={expense.id} 
                                expense={expense} 
                                showButtons={false}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

ExpensesUser.propTypes = {
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            expenses: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                    category: PropTypes.string.isRequired,
                    description: PropTypes.string.isRequired,
                    participants: PropTypes.arrayOf(
                        PropTypes.shape({
                            id: PropTypes.string.isRequired,
                            name: PropTypes.string.isRequired,
                            sharePercentage: PropTypes.number.isRequired,
                            amountToPay: PropTypes.number.isRequired,
                            isPaid: PropTypes.bool.isRequired,
                        })
                    ).isRequired, 
                })
            ).isRequired
        })
    ).isRequired
};