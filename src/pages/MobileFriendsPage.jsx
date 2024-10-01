import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AddFriend from "../components/AddFriend.jsx";
import MobileSearchBar from "../components/MobileSearchBar.jsx";

export default function MobileFriendsPage() {
    const {friends} = useContext(AppContext)
    const location = useLocation();
    const navigate = useNavigate();
    const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
    const [searchedFriends, setSearchedFriends] = useState([])

    useEffect(() => {
        if (location.state && location.state.openAddFriendModal) {
            setIsAddFriendModalOpen(true);
        }
    }, [location.state]);

    function openAddFriendModal() {
        setIsAddFriendModalOpen(true);
    }

    function closeAddFriendModal() {
        setIsAddFriendModalOpen(false)
        navigate("/mobile-friends", { state: { openAddFriendModal: false } });
    }

    function handleSearch(inputValue) {
        const spaceRemovedInput = inputValue.toLowerCase().replace(/\s+/g, '');
    
        const filtered = friends.filter((friend) => {
            const spaceRemovedName = friend.name.toLowerCase().replace(/\s+/g, '');
            const spaceRemovedUserName = friend.userName.toLowerCase().replace(/\s+/g, '');
            return (
                spaceRemovedName.toLowerCase().includes(spaceRemovedInput) ||
                spaceRemovedUserName.toLowerCase().includes(spaceRemovedInput)

            )
        })
        setSearchedFriends(filtered)
      } 

    return (
        <div className="p-4 max-w-[500px] w-full tracking-wide">
            <MobileSearchBar name="friend" onChange={handleSearch} />
            <h2 className="text-gray-500 mb-1">Friends</h2>
            <button
            onClick={openAddFriendModal}  
            className="w-full p-2 bg-gray-200 text-black rounded-md font-medium hover:bg-gray-300"
            >
            + New friend
            </button>

            {(searchedFriends.length > 0 ? searchedFriends : friends).length > 0 ? (
                <ul>
                    {(searchedFriends.length > 0 ? searchedFriends : friends).map((friend) => (
                        <li 
                            key={friend.id}
                            className="border-2 border-gray-200 rounded-md mt-1 hover:bg-gray-200 bg-white"
                        >
                            <NavLink to={`/friend/${friend.id}`} className="flex items-center p-3">
                            <img
                                src="../../images/profilePlaceHolder.png"
                                className="w-8 mr-2 border border-gray-200 rounded-full"
                                alt="Friend profile icon"
                            />
                            <div>
                                <h3 className="font-medium">{friend.name}</h3>
                                <p className="text-xs text-gray-600">- groups in common</p>
                            </div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            ) : (
            <p>You don&apos;t have any friends yet.</p>
            )}



            {isAddFriendModalOpen && (
                <AddFriend closeAddFriendModal={closeAddFriendModal} />
            )}
        </div>
    )
}