/* eslint-disable react/prop-types */
const GROUP_TYPES = [
  "Games",
  "Business",
  "Party",
  "Fun",
  "Trip",
  "House",
  "Other",
];

export default function GroupType({ groupsData, updateGroupType }) {
  return (
    <div className="my-2">
      <label className="ml-2 text-sm my-2">Group type*</label>
      <div className="flex gap-2">
        {GROUP_TYPES.map((option) => (
          <button
            type="button"
            key={option}
            className={`px-2 py-1 border rounded-md text-sm hover:bg-gray-300 ${
              groupsData.type === option ? "bg-gray-300" : " bg-white"
            }`}
            onClick={() => updateGroupType(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
