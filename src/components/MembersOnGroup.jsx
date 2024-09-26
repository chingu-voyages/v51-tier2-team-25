/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export default function MembersOnGroup({
  groupMembers,
  deleteMemberFromGroup,
}) {
  const noMembersMessage = (
    <div className="flex items-center m-2">
      <img src="../../images/Profile.svg" className="m-2" />
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
          className="flex items-center w-2/6 p-2 m-1 text-sm bg-gray-300 rounded-md justify-items-start"
          key={member.id}
        >
          <button
            className="flex items-center h-4 p-1 mx-2 border border-current rounded-md hover:bg-hover"
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
