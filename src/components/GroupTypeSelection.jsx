import PropTypes from "prop-types";

const GroupTypeSelection = ({ handleChange, groupsData }) => {
  const groupTypes = [
    "Games",
    "Business",
    "Party",
    "Fun",
    "Trip",
    "House",
    "Other",
  ];
  return (
    <>
      <p className="mt-4 text-sm font-normal">Group type*</p>
      <div className="flex items-center gap-1 mt-2">
        {groupTypes.map((groupType) => {
          return (
            <label
              key={groupType}
              className={`text-sm pr-3 py-2 border rounded-md cursor-pointer hover:font-bold border-border ${
                groupsData.groupType === groupType
                  ? "bg-button text-gray"
                  : "bg-zinc-50 text-black"
              }`}
            >
              <input
                className="invisible"
                type="radio"
                name="groupType"
                value={groupType}
                checked={groupsData.groupType === groupType}
                onChange={handleChange}
              />
              {groupType}
            </label>
          );
        })}
      </div>
    </>
  );
};

GroupTypeSelection.propTypes = {
  handleChange: PropTypes.func.isRequired,
  groupsData: PropTypes.shape({
    groupType: PropTypes.string.isRequired,
  }).isRequired,
};

export default GroupTypeSelection;
