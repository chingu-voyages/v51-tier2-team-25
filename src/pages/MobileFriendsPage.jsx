import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AddFriend from "../components/AddFriend.jsx";

export default function MobileFriendsPage() {
    const {friends} = useContext(AppContext)
    const location = useLocation();
    const navigate = useNavigate();
    const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);

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

    return (
        <div className="p-4 max-w-[500px] w-full tracking-wide">

            {/* Group search bar comes here */}
            <div className="border-2 border-dashed p-2 mb-3">
                <p>search bar placeholder</p>
            </div>

            <h2 className="text-gray-500 mb-1">Friends</h2>
            <button
            onClick={openAddFriendModal}  
            className="w-full p-2 bg-gray-200 text-black rounded-md font-medium hover:bg-gray-300"
            >
            + New friend
            </button>
            {friends.length > 0 ? (
            <ul>
                {friends.map((friend) => (
                <li 
                    key={friend.id}
                    className="border-2 border-gray-200 rounded-md mt-1 hover:bg-gray-200 bg-white"
                >
                    <NavLink to={`/friend/${friend.id}`} className="flex items-center p-3">
                    <img
                        src="../../images/profilePlaceHolder.png"
                        className="w-8 mr-2 border border-gray-200 rounded-full"
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