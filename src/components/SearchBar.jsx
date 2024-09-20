/* eslint-disable no-unused-vars */
import Select from "react-select";
import { useContext, useState } from "react";
import { AppContext } from "../App";

export default function SearchBar() {
  //using react select library for component
  const { friends, setMemberData } = useContext(AppContext);
  const options = friends.map((friend) => {
    return { value: friend.id, label: `${friend.name} ${friend.id}` };
  });

  const filterOptions = (option, inputValue) =>
    option.label.includes(inputValue) ||
    option.value.toString().includes(inputValue);

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  function addSelectionToForm(optionselected) {
    const selectedFriend = friends.filter(
      (friend) => friend.id === optionselected.value
    );

    setMemberData({
      name: selectedFriend[0].name,
      id: selectedFriend[0].id,
      share: "",
    });
  }

  return (
    <>
      <Select
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
      />
    </>
  );
}
