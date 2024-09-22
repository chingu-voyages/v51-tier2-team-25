/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export default function MembersOnGroup({ groupMembers }) {
  //console.log("groupMembers from membersOnGroup", groupMembers);
  return (
    <ul className="flex flex-col">
      {groupMembers.map((member) => (
        <li key={member.id}>{member.name}</li>
      ))}
    </ul>
  );
}
