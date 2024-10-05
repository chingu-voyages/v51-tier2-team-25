import GetOwePaid from "../helpers/GetOwePaid"
import PropTypes from 'prop-types';

export default function Expense({expense, openReceipt, openEditExpense}) {
    return (
        <div>
            <div key={expense.id} className="flex items-center justify-between p-4 my-2 border border-gray-300 rounded-md bg-zinc-50">
              <div className='flex flex-col gap-2'>
                <div className="flex gap-2 bg-zinc-50">
                  <p className="text-sm font-bold">{expense.name}</p>
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
        </div>
    )
}

Expense.propTypes = {
    expense: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }).isRequired,
    openReceipt: PropTypes.func.isRequired,
    openEditExpense: PropTypes.func.isRequired,
}