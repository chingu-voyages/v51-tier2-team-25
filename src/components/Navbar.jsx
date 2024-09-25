import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import AddGroup from "./AddGroup.jsx";
import { AppContext } from "../App";

import AddFriend from "./AddFriend.jsx";
import LinkAddFriendModal from "./LinkAddFriendModal.jsx";

export default function Navbar() {
  // TESTING ONLY to clear local storage -REMOVE
  // localStorage.clear()

  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [isLinkAddFriendModalOpen, setIsLinkAddFriendModalOpen] =
    useState(false);
  const { groups, friends } = useContext(AppContext);

  function openAddGroupModal() {
    console.log("open group modal");
    setIsAddGroupModalOpen(true);
  }
  function closeAddGroupModal() {
    console.log("close group modal");
    setIsAddGroupModalOpen(false);
  }
  function openAddFriendModal() {
    setIsAddFriendModalOpen(true);
  }
  function closeAddFriendMenu() {
    setIsAddFriendModalOpen(false);
  }
  function openLinkAddFriendModal() {
    setIsLinkAddFriendModalOpen(true);
  }
  function closeLinkAddFriendModal() {
    setIsLinkAddFriendModalOpen(false);
    setIsAddGroupModalOpen(true);
  }

  return (
    <aside className="flex flex-col h-screen p-12 font-geologica">
      <nav className="w-48">
        <div className="flex items-center pb-12">
          <img
            src="../images/placeholder.jpg"
            className="w-8 h-8 mr-2 border border-none rounded-full"
          />
          <p className="block text-lg">Brand Name</p>
        </div>
        <div className="flex items-center py-1 my-2 rounded hover:bg-light-indigo">
          <img src="../images/Home.svg" className="mr-2" />
          <NavLink className="block" to="/">
            Home
          </NavLink>
        </div>
        <div className="flex items-center py-1 my-6 rounded hover:bg-light-indigo">
          <img src="../images/Profile.svg" className="mr-2" />
          <NavLink className="block" to="/profile">
            Profile
          </NavLink>
        </div>

        <ul>
          <li className="pt-6">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-400">Groups</span>
              <button
                onClick={openAddGroupModal}
                className="w-6 h-6 text-center rounded-md text-light-indigo bg-button hover:bg-hover"
              >
                +
              </button>
            </div>
            {groups.length > 0 && (
              <ul className="">
                {groups.map((group) => (
                  <li
                    key={group.id}
                    className="flex items-center py-1 my-2 rounded hover:bg-light-indigo"
                  >
                    <img
                      src="../images/profilePlaceHolder.png"
                      className="w-6 h-6 mr-2 border border-none rounded-full"
                    />
                    <NavLink className="block " to={`/group/${group.id}`}>
                      {group.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className="pt-6">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-400">Friends</span>
              <button
                onClick={openAddFriendModal}
                className="w-6 h-6 text-center rounded-md text-light-indigo bg-button hover:bg-hover"
              >
                +
              </button>
            </div>
            {friends.length > 0 && (
              <ul className="">
                {friends.map((friend) => (
                  <li
                    key={friend.id}
                    className="flex items-center py-1 my-2 rounded hover:bg-light-indigo"
                  >
                    <img
                      src="../images/profilePlaceHolder.png"
                      className="w-6 h-6 mr-2 border border-none rounded-full"
                    />

                    <NavLink className="block" to={`/friend/${friend.id}`}>
                      {friend.userName}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {isAddGroupModalOpen && (
        <AddGroup
          closeAddGroupModal={closeAddGroupModal}
          openLinkAddFriendModal={openLinkAddFriendModal}
        />
      )}
      {isAddFriendModalOpen && (
        <AddFriend closeAddFriendMenu={closeAddFriendMenu} />
      )}
      {isLinkAddFriendModalOpen && (
        <LinkAddFriendModal
          closeLinkAddFriendModal={closeLinkAddFriendModal}
          openAddGroupModal={openAddFriendModal}
        />
      )}
    </aside>
  );
}
