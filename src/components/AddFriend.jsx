import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function AddFriend({ closeAddFriendModal }) {
  const { addFriendToList, friends, showNotification } = useContext(AppContext);
  const navigate = useNavigate();

  // Initialize state for newFriendData
  const [newFriendData, setNewFriendData] = useState({
    avatar:"",
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

  useEffect(()=>{
    if (newFriendData.userName) {
      const apiKey = import.meta.env.VITE_AVATAR_API_KEY
      const apiUrl = `https://api.multiavatar.com/${newFriendData.userName}.svg?apikey=${apiKey}`;

      fetch(apiUrl)
        .then((response) => response.text())
        .then((avatarSvg) => {
          setNewFriendData((prevNewFriendData) => ({
            ...prevNewFriendData,
            avatar: `data:image/svg+xml;utf8,${encodeURIComponent(avatarSvg)}`,

          }));
        })
        .catch((error) => console.error('Error fetching avatar:', error));
    }
  }, [newFriendData.userName]);

  useEffect(() => {
    console.log("newFriendData updated: ", newFriendData);
  }, [newFriendData]);

  const addNewFriend = (event) => {
    event.preventDefault();

      // Ensure avatar is set before adding the friend
    if (!newFriendData.avatar) {
      showNotification("Avatar is not generated yet. Please wait.", 'error');
      return;
    }

    console.log("Adding new friend: ", newFriendData);
    
    //validate userName
    const isUserNameTaken = friends.some(
      (friend) =>
        friend.userName.toLowerCase() === newFriendData.userName.toLowerCase()
    );
    if (isUserNameTaken) {
      showNotification("User name is taken choose another user name",'error');
      return;
    }

    addFriendToList(newFriendData);    
    
    localStorage.setItem("friendsList", JSON.stringify([...friends, newFriendData]))
    
    // const temporaryGroupData = JSON.parse(localStorage.getItem("temporaryGroupData")) || {};
    // const updatedTemporaryGroupData = {
    //   ...temporaryGroupData,
    //   members: [...(temporaryGroupData.members || []), newFriendData],
    // };
    // localStorage.setItem("temporaryGroupData", JSON.stringify(updatedTemporaryGroupData));

    closeAddFriendModal();
    showNotification("New friend added",'success');
    
    // Check screen size to conditionally navigate
    if (window.innerWidth < 768) {
      // If small screen, navigate to mobile-friends page
      navigate("/mobile-friends");
    } else {
      // If not small screen, navigate to the friend's detail page
      navigate(`friend/${newFriendData.id}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-gray-800 bg-opacity-75">
      <div className="relative flex flex-col p-6 m-10 border rounded-md border-black-100 bg-zinc-50 font-geologica md:min-h-64 ">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-black-200">
          <h1 className="p-0 text-md">Add Friend</h1>
        </div>

        <form
          onSubmit={addNewFriend}
          className="flex flex-col flex-1 gap-6 overflow-auto border border-none"
        >
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row">
              <label className="flex flex-col mb-4 text-sm md:pr-2 md:mb-0">
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

              <label className="flex flex-col w-full mb-4 text-sm md:pr-2 md:mb-0">
                Friend UserName
                <input
                  className="w-[194px] p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9"
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
                className="self-start px-3 py-2 mb-10 text-sm border-none rounded-lg h-9 hover:bg-hover bg-button text-light-indigo md:mb-0 md:self-end md:w-full"
              >
                Add Friend
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex items-center w-full h-12 p-4 bg-light-indigo place-content-end">
              <button
                type={"button"}
                onClick={closeAddFriendModal}
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
