/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export default function MembersOnGroup({
  groupMembers,
  deleteMemberFromGroup,
}) {
  const noMembersMessage = (
    <div className="flex items-star m-2">
      <img src="../public/images/profile_icon.png" className="m-2" />
      <p className="text-xs text-gray-500">
        There is no one added to expense yet. Try searching and adding from your
        friend list or quickly add someone by entering their user name
      </p>
    </div>
  );

  return groupMembers.length < 1 ? (
    noMembersMessage
  ) : (
    <ul className="flex flex-wrap">
      {groupMembers.map((member) => (
        <li
          className=" flex justify-items-start items-center w-2/6  p-2 m-1 text-sm bg-gray-300 rounded-xl"
          key={member.id}
        >
          <button
            className="mx-2 hover:bg-hover border rounded-md p-1 h-4 flex items-center border-current"
            onClick={() => deleteMemberFromGroup(member)}
          >
            x
          </button>
          <p className="truncate">{member.userName}</p>
        </li>
      ))}
    </ul>
  );
}
