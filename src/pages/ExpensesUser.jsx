import { useContext } from "react";
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
                                group={group}
                                showButtons={false}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}