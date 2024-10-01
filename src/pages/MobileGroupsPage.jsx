import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { NavLink, useLocation } from "react-router-dom";
import AddGroup from "../components/AddGroup.jsx";
import AddFriend from "../components/AddFriend.jsx";
import LinkAddFriendModal from "../components/LinkAddFriendModal.jsx";
import MobileSearchBar from "../components/MobileSearchBar.jsx";

export default function MobileGroupsPage() {
  const { groups } = useContext(AppContext);
  const location = useLocation();
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [isLinkAddFriendModalOpen, setIsLinkAddFriendModalOpen] = useState(false);
  const [searchedGroups, setSearchedGroups] = useState([])

  useEffect(() => {
    if (location.state) {
      if (location.state.openAddGroupModal) {
        setIsAddGroupModalOpen(true);
      }
      if (location.state.openLinkAddFriendModal) {
        setIsLinkAddFriendModalOpen(true);
      }
      if (location.state.openAddFriendModal) {
        setIsAddFriendModalOpen(true);
      }
    }
  }, [location.state]);

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
    setIsAddFriendModalOpen(false)
  }

  function openLinkAddFriendModal() {
    setIsLinkAddFriendModalOpen(true);
  }

  function closeLinkAddFriendModal() {
    setIsLinkAddFriendModalOpen(false);
    setIsAddGroupModalOpen(true);
  }

  function handleSearch(inputValue) {
    const spaceRemovedInput = inputValue.toLowerCase().replace(/\s+/g, '');

    const filtered = groups.filter((group) => {
        const spaceRemovedGroupName = group.name.toLowerCase().replace(/\s+/g, '');
        return spaceRemovedGroupName.toLowerCase().includes(spaceRemovedInput)
    })
    setSearchedGroups(filtered)
  } 



  return (
    <div className="p-4 max-w-[500px] w-full tracking-wide">
      <MobileSearchBar name="group" onChange={handleSearch} />
      <h2 className="text-gray-500 mb-1">Groups</h2>
      <button
        onClick={openAddGroupModal}  
        className="w-full p-2 bg-gray-200 text-black rounded-md font-medium hover:bg-gray-300"
      >
        + New group
      </button>

      {(searchedGroups.length > 0 ? searchedGroups : groups).length > 0 ? (
        <ul>
            {(searchedGroups.length > 0 ? searchedGroups : groups).map((group) => (
                <li 
                    key={group.id} 
                    className="border-2 border-gray-200 rounded-md mt-1 hover:bg-gray-200 bg-white"
                >
                    <NavLink to={`/group/${group.id}`} className="flex items-center p-3">
                        <img
                            src="../../images/profilePlaceHolder.png"
                            className="w-8 mr-2 border border-gray-200 rounded-full"
                            alt="Group profile icon"
                        />
                        <div>
                            <h3 className="font-medium">{group.name}</h3>
                            <p className="text-xs text-gray-600">{group.members.length} people</p>
                        </div>
                    </NavLink>
                </li>
            ))}
        </ul>
      ) : (
        <p>You don&apos;t have any groups yet.</p>
      )}
      {isAddGroupModalOpen && (
        <AddGroup
          closeAddGroupModal={closeAddGroupModal}
          openLinkAddFriendModal={openLinkAddFriendModal}
        />
      )}
      {isLinkAddFriendModalOpen && (
        <LinkAddFriendModal
          closeLinkAddFriendModal={closeLinkAddFriendModal}
          openAddGroupModal={openAddFriendModal}
        />
      )}
      {isAddFriendModalOpen && (
        <AddFriend closeAddFriendModal={closeAddFriendModal} />
      )}
    </div>
  );
}
