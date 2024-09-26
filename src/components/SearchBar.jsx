/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Select from "react-select";
import { useContext, useImperativeHandle, useState, useEffect } from "react";
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

export default function SearchBar({ 
  handleMemberSelected, 
  handleParticipantAdded, 
  purpose="member", //sets default purpose of search bar to add member to group
  groupMembers=[],
  
}) {  
  //using react select library for component
  const { friends } = useContext(AppContext);
  
  //options based on purpose of SearchBar
  const options = (purpose === 'participant' ? groupMembers : friends).map(person =>({
    value: person.userName,
    label: person.userName,
    id:person.id,
  }))

  const placeHolderMessage =
    options.length === 0
      ? (purpose ==="participant" ? "No members in this group": "Please add a friend first")
      : "Search on your list of friends";

  //if no options to choose
  const isListEmpty = options.length === 0;

  const filterOptions = (option, inputValue) =>
    option.value.toLowerCase().includes(inputValue);

  const [isClearable] = useState(true);
  const [isSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(isListEmpty);
  const [isLoading] = useState(false);
  const [isRtl] = useState(false);

  //update isDisabled state when change groupMember or friends
  useEffect(()=>{
    setIsDisabled(isListEmpty)
  },[groupMembers, friends, isListEmpty])

  function addSelectionToForm(optionSelected) {
    if (!optionSelected) {
      return;
    }

    const selectedPerson = (purpose==='participant'? groupMembers: friends).find(
      (person)=> person.userName === optionSelected.value
    )
    
    
    //call appropriate handler based on purpose of prop
    if(purpose==="member" && handleMemberSelected){
      handleMemberSelected(selectedPerson);
    } else if(purpose==="participant" && handleParticipantAdded){
      handleParticipantAdded(selectedPerson)
    }
    
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
