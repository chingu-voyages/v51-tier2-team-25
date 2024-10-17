import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import AddGroup from "./AddGroup.jsx";
import { AppContext } from "../App";
import AddFriend from "./AddFriend.jsx";
import LinkAddFriendModal from "./LinkAddFriendModal.jsx";

export default function Navbar() {

  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [isLinkAddFriendModalOpen, setIsLinkAddFriendModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHomeHovered, setIsHomeHovered] =useState(false)
  const [isProfileHovered, setIsProfileHovered] =useState(false) 
  const [isFriendHovered, setIsFriendHovered] =useState(false)
  const [isGroupHovered, setIsGroupHovered] = useState(false)
  const { groups, friends, mainUser, showNotification } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();


  function openAddGroupModal() {
    if(!mainUser || !mainUser.id){
      showNotification("Please create a profile before adding a group.", 'error')
      return
    }
    setIsAddGroupModalOpen(true);
  }
  function closeAddGroupModal() {
    setIsAddGroupModalOpen(false);
  }

  function openAddFriendModal() {
    if(!mainUser || !mainUser.id){
      showNotification("Please create a profile before adding friends.", 'error')
      return
    }
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

  //filter main user from friends list for display
  // Ensure mainUser has an id before using it for filtering
  const displayedFriends = mainUser && mainUser.id ? friends.filter(friend => friend.id !== mainUser.id) : friends;


  // Screen size change effect
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    function handleScreenResize(event) {
      if (event.matches) {
        if (location.pathname === "/mobile-groups" || location.pathname === "/mobile-friends") {
          navigate("/");
        }
      }
    }

    mediaQuery.addEventListener("change", handleScreenResize);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenResize);
    };
  }, [location.pathname, navigate]);


  return (
    <>
      {isMenuOpen && (
        <div 
          className="fixed bottom-0 left-0 right-0 z-10 bg-gray-800 bg-opacity-75 top-14"
          onClick={toggleMenu}
        ></div>
      )}
      <aside className="relative z-30 flex flex-col md:h-screen md:p-12 font-geologica md:py-12 md:px-8">
        <nav className="relative z-30 md:w-48">
          <div className="flex justify-between mx-4 my-3 md:m-0">
            <NavLink className="block" to="/">
                <div className="flex items-center px-3 md:mb-12">
                    <img
                      src="../../images/SliceLogo.svg"
                      alt="Slice Logo"
                      className="md:w-[137px] w-[90px] my-1"
                    />
                </div>
              </NavLink>
            <img src="../../images/Menu.svg" alt="menu" className="cursor-pointer w-7 md:hidden" onClick={toggleMenu}/>
          </div>

          <div className={`md:block absolute z-20 w-full cursor-pointer md:bg-white bg-[#F0F1F5] ${isMenuOpen ? 'block' : 'hidden'}`}>
            <NavLink className="block" to="/">
              <div className="flex items-center p-3 rounded md:hover:bg-light-indigo hover:bg-[#D8DBE5]" 
                onClick={handleNavClick}
                onMouseEnter={()=>setIsHomeHovered(true)}
                onMouseLeave={()=>setIsHomeHovered(false)}
              >
                <img src={isHomeHovered ? "../../images/DarkHome.svg":"../../images/Home.svg"} alt="home" className="mr-2" />
                <p className="font-extralight">Home</p>
              </div>
            </NavLink>
            <NavLink className="block" to="/profile">
              <div className="flex items-center p-3 rounded md:hover:bg-light-indigo hover:bg-[#D8DBE5]" 
                onClick={handleNavClick}
                onMouseEnter={()=>setIsProfileHovered(true)}
                onMouseLeave={()=>setIsProfileHovered(false)}              
              >
                <img src={isProfileHovered ? '../../images/DarkProfile.svg' : "../../images/Profile.svg"} alt="avatar" className="mr-2" />
                <p className="font-extralight">Profile</p>
              </div>
            </NavLink>
            <NavLink className="block" to={{pathname: "/mobile-groups"}}>
              <div className="md:hidden flex items-center p-3 rounded-md md:hover:bg-light-indigo hover:bg-[#D8DBE5]" 
                onClick={handleNavClick}
                onMouseEnter={()=>setIsGroupHovered(true)}
                onMouseLeave={()=>setIsGroupHovered(false)} 
              >
                <img src={isGroupHovered ?'../../images/DarkGroups.svg' : "../../images/Groups.svg"} alt="avatar" className="w-6 h-6 mr-2 rounded-full" />
                <p className="font-extralight">Groups</p>
              </div>
            </NavLink>
            <NavLink className="block" to={{pathname: "/mobile-friends"}}>
            <div className="md:hidden flex items-center p-3 rounded-md md:hover:bg-light-indigo hover:bg-[#D8DBE5]" 
              onClick={handleNavClick}
              onMouseEnter={()=>setIsFriendHovered(true)}
              onMouseLeave={()=>setIsFriendHovered(false)}
            >
              <img src={isFriendHovered ? "../../images/DarkFriend.svg" : "../../images/Friends.svg"} className="mr-2" />
              <p className="font-extralight">Friends</p>             
            </div>
            </NavLink>

            <ul className="hidden md:block" >
              <li className="pt-6" onClick={handleNavClick}>
                <div className="flex items-center py-2 md:justify-between">
                  <span className="p-3 mr-4 text-gray-400">Groups</span>
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
                          src={group.avatar || "../../images/Groups.svg"}
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
                <div className="flex items-center py-2 md:justify-between">
                  <span className="p-3 mr-4 text-gray-400">Friends</span>
                  <button
                    onClick={openAddFriendModal}
                    className="w-6 h-6 text-center rounded-md text-light-indigo bg-button hover:bg-hover"
                  >
                    +
                  </button>
                </div>
                {displayedFriends.length > 0 && (
                  <ul className="">
                    {displayedFriends.map((friend) => (
                      <li
                        key={friend.id}
                        className="flex items-center p-3 gap-2 rounded md:hover:bg-light-indigo hover:bg-[#D8DBE5]"
                      >
                      <img src={friend.avatar} className='w-6 h-6 border-border'/>  
                        
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
            openAddGroupModal={closeLinkAddFriendModal}
          />
        )}
      </aside>
    </>

  );
}
