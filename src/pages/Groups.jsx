import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../App";
import EditGroupForm from "../components/EditGroupForm";
import AddExpense from "../components/AddExpense";
import EditAddFriendModal from "../components/EditAddFriendModal";
import RemainingBudget from "../helpers/RemainingBudget";

const getNavLinkClass = ({ isActive })=> isActive ? "px-2 py-1 text-sm bg-gray-200 rounded-t-md" : "px-2 py-1 text-sm"

export default function Groups() {
  const { groupId } = useParams(); // Get the groupId from the URL
  const { groups } = useContext(AppContext); // Get all groups from context
  const navigate = useNavigate();

  const [isEditGroupFormModalOpen, setIsEditGroupFormModalOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const { addExpenseToList } = useContext(AppContext);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);

  // Find the current group based on the groupId
  const currentGroup = groups.find((group) => group.id === Number(groupId));

  //console.log('current group expenses:',currentGroup?.expenses)

  useEffect(() => {
    if (currentGroup) {
      navigate(`expenses`); //auto navigate to expense page when group loads
    }
  }, [currentGroup, navigate]);

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
      <div className="flex flex-col w-[785px] gap-6 font-geologica">
        <div className="p-6 mt-12 border rounded-md border-border bg-zinc-50">
          <div className="relative flex justify-between w-full">
            <div className="relative min-w-max">
              <img
                className="w-32 h-32 p-3 rounded-full"
                src="../../images/placeholder.jpg"
              />
              <div className="absolute px-2 py-1 text-xs font-light text-gray-700 transform -translate-x-1/2 bg-white border-2 left-1/2 top-24 rounded-xl">
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
              className="h-4"
              src="../../images/Setting.svg"
              onClick={openEditGroupFormModal}
            />
          </div>

          <div className="flex items-end pt-6">
            <div className="flex items-center w-1/2">
              <img
                className="w-8 h-8 rounded-full"
                src="../../images/placeholder.jpg"
              />
              <p className="pl-2 text-sm text-gray-500">
                {currentGroup?.members.length} members
              </p>
            </div>

            <div className="flex items-center w-full gap-6 place-content-end">
              <div className="flex flex-col">
                <p className="text-xs text-gray-500">Allotted budget</p>
                <p className="text-sm, text-gray-950">
                  $ {currentGroup?.allottedBudget}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-xs text-gray-500">Remaining</p>
                <p className="text-sm, text-gray-950">${RemainingBudget()}</p>
              </div>

              <button
                className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo"
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
                group={currentGroup} // Pass the current group's data as props
                closeEditGroupFormModal={closeEditGroupFormModal}
                openAddFriendModal={openAddFriendModal}
              />
            )}
            {isAddFriendModalOpen && (
              <EditAddFriendModal
                closeAddFriendModal={closeAddFriendModal}
                openEditGroupFormModal={openEditGroupFormModal}
              />
            )}
          </div>
        </div>        
        <div className=" rounded-t-md">
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
