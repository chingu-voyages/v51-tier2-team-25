import React, { useState, useContext,useEffect } from "react";
import PropTypes from 'prop-types';
import { AppContext } from "../App";


export default function Expense({expense, group, showButtons, openReceipt, openEditExpense}) {
    const [isExpenseOpen, setIsExpenseOpen] = useState(false);
    const { handleToggleIsPaid } = useContext(AppContext);
    const [fullyPaidDate, setFullyPaidDate] = useState(null);
    const storedUser = JSON.parse(localStorage.getItem('mainUser'))
    // console.log("this is the group data;", group)

    const peopleRemainingToPay = expense.participants.filter(participant => !participant.isPaid).length;
    const unpaidAmount = expense.participants.filter(p => !p.isPaid).reduce((total, participant) => total + participant.amountToPay, 0);
    const allPaid = expense.participants.every(participant => participant.isPaid);

    useEffect(() => {
        if (allPaid && !fullyPaidDate) {
            const currentDate = new Date().toLocaleDateString(); 
            setFullyPaidDate(currentDate);
        }
    }, [allPaid, fullyPaidDate]);

    const hasUser = expense.participants.find(participant => participant.id === storedUser.id)
    const userIsPaid = hasUser ? hasUser.isPaid : false;
    const userAmountToPay = hasUser ? hasUser.amountToPay : 0;

    const isGroupMember = (participantId) => {
        return group.members.some(member => member.id === participantId);
    };

    return (
        <div>
            <div
                key={expense.id}
                className={`p-4 my-2 border border-gray-300 rounded-md font-light text-gray-600 tracking-wide ${
                allPaid ? "" : "bg-zinc-50"
                }`}
                style={ allPaid ? { background:"linear-gradient(90deg, #F0F9F3 0%, #FAFAFA 100%)" } : {} }
            >
                <div className="flex items-center justify-between" onClick={()=> setIsExpenseOpen(!isExpenseOpen)}>
                    <div className='flex flex-col gap-2'>
                        <div className="flex gap-2">
                            <p className="text-sm font-medium text-gray-900 ">{expense.name}</p>
                            <div className="flex w-3 h-4">
                                {isExpenseOpen ? <img src="../../images/CloseArrow.svg" alt="Close icon" /> : <img src="../../images/OpenArrow.svg" alt="Open icon" />}
                            </div>
                            <p className="px-1 text-xs border rounded-md bg-light-indigo border-border">{expense.category}</p>
                        </div>
                        <div className="flex text-sm">
                            <div className="text-center">
                                {hasUser && !userIsPaid ? (
                                    <p className="px-2 text-red-800 bg-red-100 border border-red-200 rounded-lg">Owe <span className="font-bold">US${userAmountToPay.toFixed(2)}</span></p>
                                ) : hasUser && userIsPaid ? (
                                    <p className="px-2 text-purple-800 bg-purple-100 border border-purple-200 rounded-lg">You already <span className="font-bold">paid</span></p>
                                ) : !hasUser ? (
                                    <p className="px-2 border rounded-lg border-lime-200 bg-lime-100 text-lime-800">Receive in total <span className="font-bold">US${expense.amount}</span></p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 text-sm'>
                        <div className='flex flex-col gap-2'>    
                            {allPaid ? (
                                <p className="text-sm"><span className="font-bold">Fully paid</span> on {fullyPaidDate}</p>
                            ) : (
                                <p className="text-sm font-semibold">US${unpaidAmount.toFixed(2)} left</p>
                            )}        
                            {allPaid ? (
                                <p>${expense.amount} paid by {expense.participants.length} members</p>
                            ) : (
                                <p>{peopleRemainingToPay} people remaining to pay</p>
                            )}
                        </div>
                        {showButtons && (
                        <div className="flex hidden gap-2 md:block">
                            <button type="button" className="px-1 py-1 rounded-md hover:bg-gray-200" onClick={() => openReceipt(expense.id)}><img src="../../images/Ticket.svg" alt="Ticket" className='w-5 h-5'/></button>
                            <button type="button" className="px-1 py-1 ml-1 rounded-md hover:bg-gray-200" onClick={() => openEditExpense(expense)}><img src="../../images/Edit.svg" alt="Edit" className='w-5 h-5'/></button>
                        </div>
                        )}
                    </div>
                </div>
                {isExpenseOpen && (
                    <div className="pt-3 mt-3 text-sm border-t">
                        <p>{expense.description}</p>

                        <div className="grid grid-cols-4 gap-2 mt-3">
                            <div className="mb-1">
                                <p className="font-medium">Members</p>
                            </div>
                            <div className="flex justify-center mb-1">
                                <p className="font-medium">Share</p>
                            </div>
                            <div className="flex justify-end mb-1">
                                <p className="font-medium">Owe (US$)</p>
                            </div>
                            <div className="flex justify-end mb-1">
                                <p className="font-medium">State</p>
                            </div>

                            {expense.participants.map((participant) => (
                                <React.Fragment key={participant.id}>
                                    <div className="flex items-center">
                                        <img src={participant.avatar} className='w-6 h-6 mr-4 rounded-full border-border'/>
                                        <p className={`${!isGroupMember(participant.id) ? 'line-through text-gray-400' : ''}`}>{participant.name}</p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p>{participant.sharePercentage}%</p>
                                    </div>
                                    <div className="flex justify-end">
                                        <p>${participant.amountToPay.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-end">
                                        <div
                                            className={`flex items-center relative w-14 h-5 rounded-full cursor-pointer transition-colors border ${
                                                participant.isPaid ? "bg-lime-500 bg-opacity-30 border-lime-200" : "bg-red-500 bg-opacity-30 border-red-200"
                                            }`}
                                            onClick={() => handleToggleIsPaid(expense.id, participant.id)}
                                        >
                                            <span
                                                className={`absolute right-1 font-light text-xs transition-all duration-300 text-red-900 tracking-wide ${
                                                participant.isPaid ? "opacity-0" : "opacity-100"
                                                }`}
                                            >
                                                Owes
                                            </span>
                                            <span
                                                className={`absolute left-2 font-light text-xs transition-all duration-300 text-lime-900 tracking-wide ${
                                                participant.isPaid ? "opacity-100" : "opacity-0"
                                                }`}
                                            >
                                                Paid
                                            </span>
                                            <span
                                                className={`absolute w-5 h-5 border ${participant.isPaid ? "border-lime-400" : "border-red-400"} bg-white rounded-full transition-transform duration-300 transform ${
                                                participant.isPaid ? "translate-x-9" : "translate-x-0"
                                                }`}
                                            />
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="grid grid-cols-4 pt-3 mt-3 text-sm border-t">
                            <p className="col-span-2">Total</p>
                            <div className="flex justify-end">
                            <p>${parseFloat(expense.amount).toFixed(2)}</p>
                            </div>
                        </div>
                        {showButtons && (
                        <div className="flex justify-between gap-2 gap-4 mt-3 md:hidden">
                            <button 
                                type="button"
                                className="flex items-center justify-center w-full gap-3 p-2 px-1 font-medium text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400"
                                onClick={() => openReceipt(expense.id)}
                            >
                                <img src="../../images/Ticket.svg" alt="Ticket"/>
                                <p>View receipt</p>
                            </button>
                            <button 
                                type="button" 
                                className="flex items-center justify-center w-full gap-3 p-2 px-1 font-medium text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400" 
                                onClick={() => openEditExpense(expense)}
                            >
                                <img src="../../images/Edit.svg" alt="Edit" />
                                <p>Edit expense</p>
                            </button>
                        </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

Expense.propTypes = {
    expense: PropTypes.shape({
        id: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired,
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
    }).isRequired,
    group: PropTypes.shape({
        members: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string,
            })
        ).isRequired,
    }).isRequired,
    showButtons: PropTypes.bool.isRequired,
    openReceipt: PropTypes.func,
    openEditExpense: PropTypes.func,
};