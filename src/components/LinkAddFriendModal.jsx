import { useContext, useState } from "react";
import { AppContext } from "../App";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

export default function LinkAddFriendModal({ closeLinkAddFriendModal }) {
  const { addFriendToList, friends } = useContext(AppContext);
  // Initialize state for newFriendData
  const [newFriendData, setNewFriendData] = useState({
    name: "",
    userName: "",
    id: uuidv4(),
  });

  // Handle input changes and updates form data state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewFriendData((prevNewFriendData) => ({
      ...prevNewFriendData,
      [name]: value,
    }));
  };

  const addNewFriend = (event) => {
    event.preventDefault();
    //validate userName
    const isUserNameTaken = friends.some(
      (friend) =>
        friend.userName.toLowerCase() === newFriendData.userName.toLowerCase()
    );
    if (isUserNameTaken) {
      toast("User name is taken choose another user name");
      return;
    }

    addFriendToList(newFriendData);
    closeLinkAddFriendModal();
    toast("New friend added");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 ">
      <div className="relative flex flex-col p-6 m-8 border rounded-md border-black-100 bg-zinc-50 font-geologica min-h-64">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-black-200">
          <h1 className="p-0 text-md">Add Friend</h1>
        </div>

        <form
          onSubmit={addNewFriend}
          className="flex flex-col flex-1 gap-6 overflow-auto border border-none"
        >
          <div className="flex flex-col ">
            <div className="flex items-end">
              <label className="flex flex-col pr-2 text-sm">
                Friend name
                <input
                  className="w-[194px] p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9"
                  type="text"
                  name="name"
                  value={newFriendData.name}
                  onChange={handleChange}
                  maxLength="30"
                  required
                />
              </label>

              <label className="flex flex-col pr-2 text-sm">
                Friend UserName
                <input
                  className="p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9"
                  type="text"
                  name="userName"
                  value={newFriendData.userName}
                  onChange={handleChange}
                  maxLength="30"
                  required
                />
              </label>
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
                onClick={() => {
                  closeLinkAddFriendModal();
                }}
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

LinkAddFriendModal.propTypes = {
  closeLinkAddFriendModal: PropTypes.func.isRequired,
};
