import { useState } from "react";
import GetOwePaid from "../helpers/GetOwePaid"
import PropTypes from 'prop-types';

export default function Expense({expense, openReceipt, openEditExpense}) {
    const [isExpenseOpen, setIsExpenseOpen] = useState(false)


    return (
        <div>
            <div key={expense.id} className="p-4 my-2 border border-gray-300 rounded-md bg-zinc-50">
                <div className="flex items-center justify-betweenflex items-center justify-between" onClick={()=> setIsExpenseOpen(!isExpenseOpen)}>
                    <div className='flex flex-col gap-2'>
                        <div className="flex gap-2 bg-zinc-50">
                            <p className="text-sm font-bold">{expense.name}</p>
                            <div className="flex w-3 h-4">
                                {isExpenseOpen ? <img src="../../images/CloseArrow.svg" alt="Close icon" /> : <img src="../../images/OpenArrow.svg" alt="Open icon" />}
                            </div>
                            <p className="px-1 text-xs border rounded-md bg-light-indigo border-border">{expense.category}</p>
                        </div>
                        <p className="text-sm">Placeholder for leftover budget</p>
                    </div>
                    <div className='flex gap-4 text-sm'>
                        <div className='flex flex-col gap-2'>
                            <GetOwePaid />             
                            <p>Placeholder people remaining</p>
                        </div>
                        <div className="flex gap-2">
                            <button type="button" className="px-1 rounded-md hover:bg-gray-200" onClick={() => openReceipt}><img src="../../images/Ticket.svg" alt="Ticket" /></button>
                            <button type="button" className="px-1 rounded-md hover:bg-gray-200" onClick={() => openEditExpense(expense)}><img src="../../images/Edit.svg" alt="Edit" /></button>
                        </div>
                    </div>
                </div>
                {isExpenseOpen && 
                    <div className="border-t mt-3 pt-3">
                        <h1>open!</h1>
                    </div>
                }
            </div>
        </div>
    )
}

Expense.propTypes = {
    expense: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }).isRequired,
    openReceipt: PropTypes.func.isRequired,
    openEditExpense: PropTypes.func.isRequired,
}