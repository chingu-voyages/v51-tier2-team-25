import { useContext, useState, useEffect, useMemo} from "react";
import {useParams } from "react-router-dom";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import Expense from "../components/Expense";
import Avvvatars from 'avvvatars-react'

export default function Friends() {

  const { friends, expenses, groups, deleteFriend, showNotification } = useContext(AppContext)
  const { friendId } = useParams()
  // const [isEditing, setIsEditing] = useState(false);
  // const [selectedExpense, setSelectedExpense] = useState(null);
  const [title, setTitle] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const currentFriend = friends.find((friend)=>friend.id === friendId)

  const friendExpenses = useMemo(()=>{
    return expenses.filter(expense => 
    expense.participants.some(participant=> participant.id === friendId))
  },[expenses, friendId])

  const currentTitle = useMemo(()=>{
    const generateTitle = (expense) =>{
      const group= groups.find(group => group.id === expense.groupId)
      return group ? group.name : 'Unknown Group'
    }

    return friendExpenses.map(expense => generateTitle(expense))
  }, [friendExpenses, groups])

  useEffect(()=>{
    if(friendExpenses.length > 0){        
      setTitle(currentTitle)
    }
  }, [currentTitle, friendExpenses.length])
  
  // if(!friendId){
  //   // console.log('friendId undefined')
  //   return
  // }
  // if(!currentFriend){
  //   // console.log('Friend not found')
  // }

  const handleDelete = () => {
    const isParticipantInAnyExpense = friendExpenses.some((expense) =>
      expense.participants.some((participant) => participant.id === friendId)
    );

    if (isParticipantInAnyExpense) {
      showNotification(
        `You need to remove ${currentFriend?.name} from all expenses before deleting them.`,
        "error"
      );
    } else {
      setIsModalOpen(true);
    }
  };

  const confirmDelete = () => {
    deleteFriend(friendId)   
    setIsModalOpen(false); 
    navigate("/");
    showNotification(`Friend ${currentFriend?.name} was deleted`,'success');
  };

  return (
    <>
      <div className="flex flex-col max-w-[785px] w-full font-outfit mx-3 mt-12 gap-4">
        <div className='flex justify-between w-full gap-4'>
          <div className='flex flex-col flex-grow w-1/2 space-y-2'>
            <p className='pl-2 text-sm text-button'>Personal information</p>
            <div className="flex-grow p-6 border rounded-md md:mt-12 border-border bg-zinc-50">
              {/* <img src="../../images/placeholder.jpg" className="h-24 mb-4 rounded-full"/> */}
              <Avvvatars 
                value={currentFriend?.userName}
                style="shape" 
                size={96}
                border={true}
                borderColor="#D8DBE5"
                borderSize={1}
              />
              <p className='text-sm font-medium text-gray-950'>Name</p>
              <p className='w-full p-2 mt-1 mb-4 text-sm text-gray-800 border rounded-md border-border'>{currentFriend?.name}</p>
              <p className='text-sm font-medium text-gray-950'>Email</p>
              <p className='w-full p-2 mt-1 mb-4 text-sm text-gray-800 border rounded-md border-border'>placeholder</p>
              <p className='text-sm font-medium text-gray-950'>Id #</p>
              <p className='w-full p-2 mt-1 mb-4 text-sm text-gray-800 border rounded-md border-border'>{currentFriend?.id}</p>
              <button type="button" className="px-3 py-2 text-sm rounded-md bg-red-button text-red-button-text hover:bg-red-button-hover" onClick={handleDelete}>Remove Friend</button>
            </div>
          </div>          
        
          <div className='flex flex-col flex-grow w-1/2 space-y-2'>
            <p className='pl-2 m-0 text-sm text-button'>Payment Services</p>
            <div className="flex-grow p-6 border rounded-md md:mt-12 border-border bg-zinc-50">
              <p className='text-sm font-medium text-gray-950'>Paypal</p>
              <div className='flex'>
                <p className='p-2 mt-1 mb-4 text-sm text-gray-800 border w-fit rounded-l-md border-input-border bg-profile-background'>paypal.me/</p>
                <p className='w-full p-2 mt-1 mb-4 text-sm text-gray-800 border border-l-0 rounded-r-md border-border'>placeholder</p>
              </div>              
              <p className='text-sm font-medium text-gray-950'>Venmo</p>
              <div className='flex'>
                <p className='p-2 mt-1 mb-4 text-sm text-gray-800 border w-fit rounded-l-md border-input-border bg-profile-background'>venmo.com/</p>
                <p className='w-full p-2 mt-1 mb-4 text-sm text-gray-800 border border-l-0 rounded-r-md border-border'>placeholder</p>
              </div>              
              <p className='text-sm font-medium text-gray-950'>Cash app</p>
              <div className='flex'>
                <p className='p-2 mt-1 mb-4 text-sm text-gray-800 border w-fit rounded-l-md border-input-border bg-profile-background'>cash.app/$</p>
                <p className='w-full p-2 mt-1 mb-4 text-sm text-gray-800 border border-l-0 rounded-r-md border-border'>placeholder</p>
              </div>
              
            </div>
          </div>
          
        </div>

        <div className="border-b border-border"> 
          <p className="px-2 py-1 text-sm bg-border rounded-t-md text-tab-text w-fit ">Your Expenses</p>
        </div>

        <div>          
          {friendExpenses.length > 0 ? (
            friendExpenses.map((expense, index) => (
              <div key={expense.id}>
                <p>{title[index]}</p>
                  <Expense 
                    key={expense.id} 
                    expense={expense} 
                    showButtons={false} 
                  />
              </div>
            ))
          ):(
            <p>No expenses for this friend</p>
          )}
        </div>
  
      </div>
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onConfirm={confirmDelete}
          onCancel={() => setIsModalOpen(false)}
          title="Delete Friend?"
          message={`Are you sure you want to delete ${currentFriend?.name}?`}
          confirmButtonText="Delete Friend"
        />
      )}
    </>
  );

}
