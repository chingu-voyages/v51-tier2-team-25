import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";
import AddMember from "./AddMember.jsx";

// eslint-disable-next-line react/prop-types
function GroupForm({ closeModal }) {
  const navigate = useNavigate();
  const { addNewGroup } = useContext(AppContext);
  const [formData, setFormData] = useState({
    groupName: "",
    groupId: "",
    groupDescription: "",
    allottedBudget: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const cancelForm = () => {
    setFormData({
      groupName: "",
      groupId: "",
      groupDescription: "",
      allottedBudget: "",
    });
    setFormData((prevFormData) => ({
      ...prevFormData,
      groupId: generateGroupId(),
    }));
  };

  const generateGroupId = () => {
    return Math.floor(10000 + Math.random() * 900000);
  };

  useEffect(() => {
    if (!formData.groupId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        groupId: generateGroupId(),
      }));
    }
  }, []);

  const renderGroupId = () => {
    return formData.groupId ? (
      <p className="absolute p-0 m-0 text-xs text-gray-400 top-1 right-10">
        #{formData.groupId}
      </p>
    ) : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let storedGroupData = JSON.parse(localStorage.getItem("formData")) || [];
    storedGroupData.push(formData);
    localStorage.setItem("formData", JSON.stringify(storedGroupData));
    setFormData({
      groupName: "",
      groupId: "",
      groupDescription: "",
      allottedBudget: "",
    });
    setFormData((prevFormData) => ({
      ...prevFormData,
      groupId: generateGroupId(),
    }));
    toast.success("Group created successfully.");
    closeModal();
    addNewGroup(formData);
    navigate(`group/${formData.groupId}`);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative border border-black-100 w-[535px] h-[625px] rounded-md p-6 bg-white flex flex-col">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-400"
        >
          X
        </button>
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-black-200">
          <h1 className="p-0 text-md">New Group</h1>
          <p className="p-0 text-xs text-gray-400">* Mandatory fields</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 gap-6 overflow-auto border border-none"
        >
          <div className="flex items-center">
            {/* TODO CHANGE PIC */}
            <img
              src="./public/images/placeholder.jpg"
              className="border border-none rounded-full w-[80px] h-[80px] mr-4"
            />

            <div className="relative flex">
              <label className="text-sm">
                Group name*
                <input
                  className="w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9"
                  type="text"
                  name="groupName"
                  value={formData.groupName}
                  onChange={handleChange}
                  maxLength="30"
                  required
                />
              </label>
              {renderGroupId()}
            </div>

            <label className="ml-2 text-sm">
              Allotted budget
              <input
                className="w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9"
                type="number"
                step="0.01"
                min="0"
                name="allottedBudget"
                value={formData.allottedBudget}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className="flex flex-col text-sm">
            Group description*
            <textarea
              className="border border-gray-300 rounded-md h-[72px] w-full text-left mt-1 p-2 text-gray-500"
              name="groupDescription"
              value={formData.groupDescription}
              onChange={handleChange}
              required
            />
          </label>

          <AddMember />

          <div className="absolute bottom-0 left-0 right-0 flex items-center w-full pr-4 bg-gray-200 place-content-end">
            <button className="text-sm" type="button" onClick={cancelForm}>
              Cancel
            </button>
            <button
              className="px-4 py-2 m-2 text-sm bg-gray-300 rounded-xl"
              type="submit"
            >
              Create group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GroupForm;
