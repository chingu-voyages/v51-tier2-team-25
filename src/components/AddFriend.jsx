import { useContext, useState } from "react";
import { AppContext } from "../App";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
export default function AddFriend({ closeAddFriendMenu }) {
  
  //I'm using context but we can use props
  const { addFriendToList } = useContext(AppContext);

  //Maybe move this to a helper function also maybe use uuid library?
  const generateGroupId = () => {
    return Math.floor(10000 + Math.random() * 900000);
  };

  // Initialize state for friendsData
  const [friendsData, setFriendsData] = useState({
    name: "",
    id: generateGroupId(),
  });

  // Handle input changes and updates form data state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFriendsData((prevFriendsData) => ({
      ...prevFriendsData,
      [name]: value,
    }));
  };

  const addNewFriend = (event) => {
    event.preventDefault();
    //get stored data from local storage or initialize array
    
    let storedGroupData = JSON.parse(localStorage.getItem("friendsData")) || [];
    
    //append new form data to array
    storedGroupData.push(friendsData);

    //save updated array to local storage
    localStorage.setItem("friendsData", JSON.stringify(storedGroupData));
    addFriendToList(friendsData);

    //reset friendsData stat w/ new ID
    setFriendsData({
      name:"",
      id:generateGroupId(),
    })

    closeAddFriendMenu();
    toast("New friend added");
  };

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative flex flex-col p-6 m-8 border rounded-md border-black-100 bg-zinc-50 font-geologica min-h-64">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-black-200">
          <h1 className="p-0 text-md">Add Friend</h1>
          
        </div>

        <form
          onSubmit={addNewFriend}
          className="flex flex-col flex-1 gap-6 overflow-auto border border-none"
        >
          <div className="flex flex-col ">
            <div className='flex items-end'>
              <label className="flex flex-col pr-2 text-sm">
                Friend name
                <input
                  className="w-[194px] p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9"
                  type="text"
                  name="name"
                  value={friendsData.name}
                  onChange={handleChange}
                  maxLength="30"
                  required
                />
              </label>
              
              {/* <label className="flex flex-col pr-2 text-sm">
                Friend ID
                <input
                  className="p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9"
                  type="text"
                  name="id"
                  disabled={true}
                  value={`#${friendsData.id}`}
                  maxLength="30"
                  required
                />
              </label> */}
              <button
                type={"submit"}
                className="px-3 py-2 text-sm border-none rounded-lg h-9 hover:bg-hover bg-button text-light-indigo "
              >
                Add Friend
              </button>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 flex items-center w-full h-12 p-4 bg-light-indigo place-content-end ">
              <button
                type={"button"}
                onClick={closeAddFriendMenu}
                className="px-4 py-2 m-2 text-sm text-black rounded-xl"
              >
                Close
              </button>              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}