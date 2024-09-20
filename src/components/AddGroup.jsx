import { useContext, useState } from "react";
import { AppContext } from "../App";
import toast from "react-hot-toast";
import PropTypes from 'prop-types'

// eslint-disable-next-line react/prop-types

export default function AddGroup({ closeAddGroupModal }) {
  //I'm using context but we can use props
  const { addGroupToList } = useContext(AppContext);

  //Maybe move this to a helper function also maybe use uuid library?
  const generateGroupId = () => {
    return Math.floor(10000 + Math.random() * 900000);
  };

  //render groupID to be visible on form
  const renderGroupId = () => {
    return groupsData.id ? <p className='absolute top-0 p-0 m-0 text-xs text-gray-400 right-8'>#{groupsData.id}</p> : null
  }

  // Initialize state for groupsData
  const [groupsData, setGroupsData] = useState({
    name: "",
    id: generateGroupId(),
    description:"",
    allottedBudget:"",
  });

  // Handle input changes and updates form data state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setGroupsData((prevGroupsData) => ({
      ...prevGroupsData,
      [name]: value,
    }));
  };

  const addNewGroup = (event) => {
    event.preventDefault();
    //get stored data from local storage or initialize array
    let storedGroupData = JSON.parse(localStorage.getItem("groupsData")) || [];
    //append new form data to array
    storedGroupData.push(groupsData);
    //save updated array to local storage
    localStorage.setItem("groupsData", JSON.stringify(storedGroupData));
    addGroupToList(groupsData);
    closeAddGroupModal();
    toast("New group added");
  };

  //Add proptypes validation for eslint
  AddGroup.propTypes = {
    closeAddGroupModal: PropTypes.func.isRequired,
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative border border-black-100 w-[535px] h-[625px] rounded-md p-6 bg-zinc-50 flex flex-col m-8 font-geologica">
        
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-black-200">
          <h1 className="p-0 text-md">New Group</h1>
          <p className="p-0 text-xs text-gray-400">*Mandatory fields</p>
        </div>
        
        <form
          onSubmit={addNewGroup}
          className="flex flex-col flex-1 gap-6 overflow-auto border border-none"
        >
          <div className="flex flex-col">
            <div className='flex items-center'>
              <img src='../public/images/placeholder.jpg' className='border border-none rounded-full w-[80px] h-[80px] mr-4'/>
              <div className='relative flex flex-col'>
                <label className="text-sm">
                Group name*
                  <input
                    className="w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9"
                    type="text"
                    name="name"
                    value={groupsData.name}
                    onChange={handleChange}
                    maxLength="30"
                    required
                  />
                </label>
                {renderGroupId()}
            </div>            

            <label className='ml-2 text-sm'>
              Allotted budget
              <input 
                className='w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9'
                type='number'
                step='0.01'
                min='0'
                name='allottedBudget'
                value={groupsData.allottedBudget}
                onChange={handleChange}
                required
              />
            </label>
            </div>
            
            <label className='flex flex-col pt-4 text-sm '>
              Group description*
              <textarea 
                className='border border-gray-300 rounded-md h-[72px] w-full text-left mt-1 p-2 text-gray-500'              
                name='description'
                value={groupsData.description}
                onChange={handleChange}
                required
              />
            </label>

            {/* TODO PLACEHOLDER */}
            <div className='pt-4 mb-auto'>
              <p className='text-gray-200'>placeholder</p>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 flex items-center w-full p-4 bg-light-indigo place-content-end ">
              <button
                type={"button"}
                onClick={closeAddGroupModal}
                className="mr-2 text-sm"
              >
                Close
              </button>
              <button
                type={"submit"}
                className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo"
              >
                Create group
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>     

  );

}
