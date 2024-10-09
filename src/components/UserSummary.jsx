import { useContext, useMemo } from 'react'
import { AppContext } from "../App";

export default function UserSummary() {
    const { expenses } = useContext(AppContext);
    const storedUser = JSON.parse(localStorage.getItem('mainUserData'))

    //Your balance
    const totalBalance = useMemo(() => {
        return expenses.reduce((total, expense) => {
            return total + expense.participants.reduce((subTotal, participant) => {
                return !participant.isPaid ? subTotal + participant.amountToPay : 0
            }, 0)
        }, 0)
    }, [expenses])

    //You're going to get
    const totalToGet = useMemo(() => {
        return expenses.reduce((total, expense) => {
        return total + expense.participants.reduce((subTotal, participant) => {
            if (participant.id !== storedUser.id && !participant.isPaid) {
            return subTotal + participant.amountToPay;
            }
            return subTotal;
        }, 0);
        }, 0);
    }, [expenses, storedUser])

    //You owe
    const totalOwe = useMemo(() => {
        return expenses.reduce((total, expense) => {
        const userParticipant = expense.participants.find(participant => participant.id === storedUser.id)
        if (userParticipant && !userParticipant.isPaid) {
            return total + userParticipant.amountToPay;
        }
        return total;
        }, 0);
    }, [expenses, storedUser]);

    return (
        <div className="flex w-full gap-2">
          <div className='flex items-center w-1/3 mt-12 border rounded-md border-border bg-zinc-50'>
            <div className='flex flex-col justify-center w-full gap-1 px-3 py-6'>
              <p className='text-xs text-gray-600'>Your balance</p>
              <p className='text-xl font-semibold text-gray-950'>US$ {totalBalance.toFixed(2)}</p>
            </div> 
          </div>

          <div className='flex items-center w-1/3 mt-12 border rounded-md border-border bg-zinc-50'>
            <div className='flex flex-col justify-center w-full gap-1 px-3 py-6'>
              <p className='text-xs text-gray-600'>You&apos;re going to get</p>
              <p className='text-xl font-semibold text-green'>US$ {totalToGet.toFixed(2)}</p>
            </div>            
            <img src="../../images/VectorGreen.svg" className="w-[67px] mr-6 h-[43px]"></img>
          </div>

          <div className='flex items-center w-1/3 mt-12 border rounded-md border-border bg-zinc-50'>
            <div className='flex flex-col justify-center w-full gap-1 px-3 py-6'>
              <p className='text-xs text-gray-600'>You owe</p>
              <p className='text-xl font-semibold text-red-700'>US$ {totalOwe.toFixed(2)}</p>
            </div>            
            <img src="../../images/VectorRed.svg" className="w-[67px] mr-6 h-[43px]"></img>
          </div>
        </div>
    )
}