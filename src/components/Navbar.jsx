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
  const [isLinkAddFriendModalOpen, setIsLinkAddFriendModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
  function closeAddFriendModal() {
    setIsAddFriendModalOpen(false);
  }
  function openLinkAddFriendModal() {
    setIsLinkAddFriendModalOpen(true);
  }

  function closeLinkAddFriendModal() {
    setIsLinkAddFriendModalOpen(false);
    setIsAddGroupModalOpen(true);
  }

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev)
  }

  function handleNavClick() {
    setIsMenuOpen()
  }

  return (
    <aside className="flex flex-col md:h-screen md:p-12 font-geologica md:py-12 md:px-8">
      <nav className="md:w-48 relative">
        <div className="flex justify-between my-3 mx-4 md:m-0">
          <NavLink className="block" to="/">
              <div className="flex items-center md:pb-12 px-3">
                  <img
                    src="../../images/placeholder.jpg"
                    className="w-8 h-8 mr-2 border border-none rounded-full"
                  />
                  <p className="block text-lg">Brand Name</p>
              </div>
            </NavLink>
          <img src="../../images/Menu.svg" className="w-7 md:hidden cursor-pointer" onClick={toggleMenu}/>
        </div>


        <div className={`md:block absolute z-10 w-full cursor-pointer md:bg-white bg-[#F0F1F5] ${isMenuOpen ? 'block' : 'hidden'}`}>
          <NavLink className="block" to="/">
            <div className="flex items-center p-3 rounded md:hover:bg-light-indigo hover:bg-[#D8DBE5]" onClick={handleNavClick}>
              <img src="../../images/Home.svg" className="mr-2" />
              <p className="font-extralight">Home</p>
            </div>
          </NavLink>
          <NavLink className="block" to="/profile">
            <div className="flex items-center p-3 rounded md:hover:bg-light-indigo hover:bg-[#D8DBE5]" onClick={handleNavClick}>
              <img src="../../images/Profile.svg" className="mr-2" />
              <p className="font-extralight">Profile</p>
            </div>
          </NavLink>
          <NavLink className="block" to={{pathname: "/mobile-groups"}}>
            <div className="md:hidden flex items-center p-3 rounded md:hover:bg-light-indigo hover:bg-[#D8DBE5]" onClick={handleNavClick}>
              <img src="../../images/Groups.svg" className="mr-2" />
              <p className="font-extralight">Groups</p>
            </div>
          </NavLink>
          <NavLink className="block" to={{pathname: "/mobile-friends"}}>
          <div className="md:hidden flex items-center p-3 rounded md:hover:bg-light-indigo hover:bg-[#D8DBE5]" onClick={handleNavClick}>
            <img src="../../images/Friends.svg" className="mr-2" />
            <p className="font-extralight">Friends</p>
          </div>
          </NavLink>

          <ul className="hidden md:block" >
            <li className="pt-6" onClick={handleNavClick}>
              <div className="flex items-center md:justify-between py-2">
                <span className="text-gray-400 mr-4 p-3">Groups</span>
                <button
                  onClick={openAddGroupModal}
                  className="w-6 h-6 text-center rounded-md text-light-indigo bg-button hover:bg-hover"
                >
                  +
                </button>
              </div>
              {groups.length > 0 ? (
                <ul>
                  {groups.map((group) => (
                    <li
                      key={group.id}
                      className="flex items-center p-3 rounded md:hover:bg-light-indigo hover:bg-[#D8DBE5]"
                    >
                      <img
                        src="../../images/profilePlaceHolder.png"
                        className="w-6 h-6 mr-2 border border-none rounded-full"
                      />
                      <NavLink className="block md:font-extralight" to={`/group/${group.id}`}>
                        {group.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
            <li className="pt-6" onClick={handleNavClick}>
              <div className="flex items-center md:justify-between py-2">
                <span className="text-gray-400 mr-4 p-3">Friends</span>
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
                      className="flex items-center p-3 rounded md:hover:bg-light-indigo hover:bg-[#D8DBE5]"
                    >
                      <img
                        src="../../images/profilePlaceHolder.png"
                        className="w-6 h-6 mr-2 border border-none rounded-full"
                      />

                      <NavLink className="block md:font-extralight" to={`/friend/${friend.id}`}>
                        {friend.userName}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {isAddGroupModalOpen && (
        <AddGroup
          closeAddGroupModal={closeAddGroupModal}
          openLinkAddFriendModal={openLinkAddFriendModal}
        />
      )}
      {isAddFriendModalOpen && (
        <AddFriend closeAddFriendModal={closeAddFriendModal} />
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
