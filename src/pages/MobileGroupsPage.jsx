import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { NavLink, useLocation } from "react-router-dom";
import AddGroup from "../components/AddGroup.jsx";
import AddFriend from "../components/AddFriend.jsx";
import LinkAddFriendModal from "../components/LinkAddFriendModal.jsx";

export default function MobileGroupsPage() {
  const { groups } = useContext(AppContext);
  const location = useLocation();
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [isLinkAddFriendModalOpen, setIsLinkAddFriendModalOpen] = useState(false);

  useEffect(() => {
    // Check if location.state exists before trying to access its properties
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

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Your Groups</h2>
      <button
        onClick={openAddGroupModal}  
        className="w-full p-2 bg-blue-500 text-white rounded mb-4"
      >
        + Add Group
      </button>
      {groups.length > 0 ? (
        <ul>
          {groups.map((group) => (
            <li key={group.id} className="my-2">
              <NavLink to={`/group/${group.id}`} className="text-blue-600">
                {group.name}
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
