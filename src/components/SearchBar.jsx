/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Select from "react-select";
import { useContext, useImperativeHandle, useState } from "react";
import { AppContext } from "../App";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#D1D5DB" : "white",
    color: state.isActive ? "black" : "",
    "&:active": {
      backgroundColor: "#D1D5DB",
    },
  }),
};

export default function SearchBar({ handleMemberSelected, ref }) {
  //using react select library for component
  const { friends } = useContext(AppContext);
  const options = friends.map((friend) => {
    return {
      value: friend.userName,
      label: friend.userName,
    };
  });
  const placeHolderMessage =
    friends.length === 0
      ? "Please add a friend first"
      : "Search on your list of friends";
  const isFriendListEmpty = friends.length === 0;

  const filterOptions = (option, inputValue) =>
    option.value.toLowerCase().includes(inputValue);

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(isFriendListEmpty);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  function addSelectionToForm(optionselected) {
    if (!optionselected) {
      return;
    }
    const selectedFriend = friends.filter(
      (friend) => friend.userName === optionselected.value
    );
    const newMember = selectedFriend[0];
    handleMemberSelected(newMember);
  }

  return (
    <div className="w-full">
      <Select
        styles={customStyles}
        placeholder={placeHolderMessage}
        className="basic-single"
        classNamePrefix="select"
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        options={options}
        filterOption={filterOptions}
        onChange={addSelectionToForm}
        maxMenuHeight={150}
      />
    </div>
  );
}
