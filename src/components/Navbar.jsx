import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import AddGroup from "./AddGroup.jsx";
import { AppContext } from "../App";

import AddFriend from "./AddFriend.jsx";
import EditGroupForm from "./EditGroupForm.jsx";

export default function Navbar() {

  // TESTING ONLY -REMOVE
  // localStorage.clear()
  
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const { groups, friends } = useContext(AppContext);

  function openAddGroupModal() {
    setIsAddGroupModalOpen(true);
  }
  function closeAddGroupModal() {
    setIsAddGroupModalOpen(false);
  }
  function openAddFriendModal() {
    setIsAddFriendModalOpen(true);
  }
  function closeAddFriendMenu() {
    setIsAddFriendModalOpen(false);

  }

  return (
    <aside className="flex flex-col w-1/4 p-4">
      <nav className="h-screen">
        <ul className="space-y-4">
          <li className="block px-4 py-2 ">Brand Name</li>
          <li>
            <NavLink
              className="block px-4 py-2 rounded hover:bg-blue-700"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="block px-4 py-2 rounded hover:bg-blue-700"
              to="/profile"
            >
              Profile
            </NavLink>
          </li>

          <li>
            <div className="flex items-center justify-between px-4 py-2 rounded hover:bg-blue-700">
              <span>Groups</span>
              <button
                onClick={openAddGroupModal}
                className="px-2 py-1 text-black rounded bg-amber-500 hover:bg-amber-600"
              >
                +
              </button>
            </div>
            {groups.length > 0 && (
              <ul className="mt-2 ml-4 space-y-2">
                {groups.map((group) => (
                  <li key={group.id}>
                    <NavLink
                      className="block px-2 py-1 rounded hover:bg-blue-700"
                      to={`/group/${group.id}`}
                    >
                      {group.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <div className="flex items-center justify-between px-4 py-2 rounded hover:bg-blue-700">
              <span>Friends</span>
              <button

                onClick={openAddFriendModal}

                className="px-2 py-1 text-black rounded bg-amber-500 hover:bg-amber-600"
              >
                +
              </button>
            </div>
            {friends.length > 0 && (
              <ul className="mt-2 ml-4 space-y-2">
                {friends.map((friend) => (

                  <li key={friend.id} className="flex items-center">
                    <img
                      src="./public/images/profilePlaceholder.jpg"
                      className="mr-4 border border-none rounded-full"
                    />


                    <NavLink
                      className="block px-2 py-1 rounded hover:bg-blue-700"
                      to={`/friend/${friend.id}`}
                    >
                      {friend.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {isAddGroupModalOpen && (
        <AddGroup closeAddGroupModal={closeAddGroupModal} />
      )}
      {isAddFriendModalOpen && (
        <AddFriend closeAddFriendMenu={closeAddFriendMenu} />
      )}
      <EditGroupForm />

    </aside>
  );
}
