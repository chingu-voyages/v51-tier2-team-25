import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../App";
import EditGroupForm from "../components/EditGroupForm";
import AddExpense from "../components/AddExpense";
import EditAddFriendModal from "../components/EditAddFriendModal"
import RemainingBudget from "../helpers/RemainingBudget";

const getNavLinkClass = ({ isActive })=> 
   `${isActive ? "px-2 py-1 text-sm bg-border rounded-t-md text-tab-text" : "px-2 py-1 text-sm text-button"} hover:text-tab-text`

export default function Groups() {
  const { groupId } = useParams(); 
  const { groups, addExpenseToList } = useContext(AppContext); 
  const navigate = useNavigate();

  const [isEditGroupFormModalOpen, setIsEditGroupFormModalOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);  
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);

  const currentGroup = groups.find((group) => group.id === Number(groupId));
  const [tempGroupData, setTempGroupData] = useState(currentGroup);

  useEffect(() => {
    if (currentGroup) {
      setTempGroupData(currentGroup);
      navigate(`expenses`); 
    }
  }, [currentGroup, navigate]);
  
  if(!groupId){
    console.error("groupId undefined")
    return
  }

  if(!currentGroup){
    console.error("Group not found")
    return
  }

  function openEditGroupFormModal() {
    setIsEditGroupFormModalOpen(true);
  }
  function closeEditGroupFormModal() {
    setIsEditGroupFormModalOpen(false);
  }
  function closeAddExpense() {
    setIsAddExpenseOpen(false);
  }
  function openAddExpense() {
    setIsAddExpenseOpen(true);
  }

  function closeAddFriendModal() {
    setIsAddFriendModalOpen(false);
  }
  function openAddFriendModal() {
    setIsAddFriendModalOpen(true);
  }


  return (
    <>
      <div className="flex flex-col max-w-[785px] w-full gap-6 font-geologica mx-3 mt-6">
        <div className="p-6 border rounded-md md:mt-12 border-border bg-zinc-50">
          <div className="relative flex flex-col md:flex-row">
            <div className="relative self-center w-32">
              <img
                className="object-cover w-24 h-24 mb-5 rounded-full border-border"
                alt='Group Avatar'
                src={currentGroup?.avatar|| "../../images/placeholder.jpg"}
              />
              <div className="absolute px-2 py-1 text-xs font-light text-gray-700 transform -translate-x-1/2 bg-white border-2 left-1/2 bottom-3 rounded-xl">
                {currentGroup?.groupType}
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="flex items-center item-center">
                <h1 className="text-2xl">{currentGroup?.name}</h1>
                <p className="pl-2 text-xs text-gray-600">
                  #{currentGroup?.id}
                </p>
              </div>
              <p className="max-w-xl pt-2 text-xs leading-relaxed text-gray-600 break-words">
                {currentGroup?.description}
              </p>
            </div>

            <img
              className="h-4 w-4 absolute md:relative md:top-0 top-[120px] right-0"
              src="../../images/Setting.svg"
              alt="Edit Expense Icon"
              onClick={openEditGroupFormModal}
            />
          </div>

          <div className="flex items-end pt-4">
            <div className="flex items-center w-1/2">
              <img
                className="w-8 h-8 rounded-full"
                alt="Members Icon"
                src= "../../images/placeholder.jpg"
              />
              <p className="pl-2 text-sm text-gray-500">
                {currentGroup?.members.length} members
              </p>
            </div>

            <div className="flex items-center w-full gap-6 place-content-end">
              <div className="flex flex-col">
                <p className="text-xs text-gray-500">Allotted budget</p>
                <p className="text-sm text-gray-950">
                  US$ {currentGroup?.allottedBudget}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-xs text-gray-500">Remaining</p>
                <p className="text-sm text-gray-950">
                  US$ <RemainingBudget groupId={groupId} />
                </p>
                
              </div>

              <button
                className="hidden px-3 py-2 text-sm border-none rounded-lg md:block hover:bg-hover bg-button text-light-indigo"
                onClick={openAddExpense}
              >
                New expense
              </button>
            </div>

            {isAddExpenseOpen && (
              <AddExpense
                closeAddExpense={closeAddExpense}
                addExpenseToList={addExpenseToList}
                currentGroup={currentGroup}
              />
            )}
            {isEditGroupFormModalOpen && (
              <EditGroupForm
                tempGroupData={tempGroupData} 
                setTempGroupData={setTempGroupData}
                closeEditGroupFormModal={closeEditGroupFormModal}
                openLinkAddFriendModal={openAddFriendModal}
              />
            )}
            {isAddFriendModalOpen && (
              <EditAddFriendModal
                closeAddFriendModal={closeAddFriendModal}
                openEditGroupFormModal={openEditGroupFormModal}
              />
            )}
          </div>
          <button
            className="w-full px-3 py-2 mt-4 text-sm border-none rounded-lg md:hidden hover:bg-hover bg-button text-light-indigo"
            onClick={openAddExpense}
          >
            New expense
          </button>
        </div>        
        <div className="">
          <NavLink className={getNavLinkClass} to={`expenses`}>
            Expenses
          </NavLink>   
          <NavLink className={getNavLinkClass} to={`statistics`}>
            Statistics
          </NavLink>
        </div>       

        <Outlet />
      </div>
    </>
  );
}
