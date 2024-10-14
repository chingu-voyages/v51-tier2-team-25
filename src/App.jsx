import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState, useEffect, useCallback } from "react";
import MobileGroupsPage from "./pages/MobileGroupsPage.jsx";
import MobileFriendsPage from "./pages/MobileFriendsPage.jsx";
import RootLayout from "./pages/Root.jsx";
import ErrorPage from "./pages/Error.jsx";
import Profile from "./pages/Profile.jsx";
import Groups from "./pages/Groups.jsx";
import Friends from "./pages/Friends.jsx";
import Home from "./pages/Home.jsx";
import Expenses from "./pages/Expenses.jsx";
import Statistics from "./pages/Statistics.jsx";
import ExpensesUser from './pages/ExpensesUser.jsx';
import toast from "react-hot-toast";

export const AppContext = createContext([]);

function App() {
  const [toastId, setToastId] = useState(null)

  const showNotification = (message, type='default')=>{
    if(toastId){
      toast.dismiss(toastId)
    }
    const newToastId= type === 'error' ? toast.error(message) : toast.success(message)
    setToastId(newToastId)
  }  

  const [mainUser, setMainUser] = useState(() => {
    const storedMainUser = localStorage.getItem("mainUser");
    return storedMainUser
      ? JSON.parse(storedMainUser)
      : { 
          avatar: "", 
          name: "", 
          userName: "", 
          id: null,
          paypal:"",
          venmo:"",
          cashapp:"",
        };
  });

  const [groups, setGroups] = useState(()=>{
    const storedGroups = localStorage.getItem("groupsData");
    return storedGroups ? JSON.parse(storedGroups) : [];
  });
  const [friends, setFriends] = useState(
    JSON.parse(localStorage.getItem("friendsData")) || []
  );
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expensesData")) || []
  );

  const [memberData, setMemberData] = useState({ name: "", id: "" });

  //members added from group to expense
  const [participantData, setParticipantData] = useState({name:"", id:""})

  //save mainUser to localStorage when it changes
  useEffect(() => {
    if (mainUser.id) {
      localStorage.setItem("mainUser", JSON.stringify(mainUser));
    }
  }, [mainUser]);


  const addMainUserToFriends = useCallback(() => {
    if (!mainUser.id) {
      console.log("Main user must be set before adding friend.");
      return;
    }
    const userAlreadyAdded = friends.some((friend) => friend.id === mainUser.id);
    if (!userAlreadyAdded ) {
      const updatedFriends = [...friends, mainUser];
      setFriends(updatedFriends);
      localStorage.setItem("friendsData", JSON.stringify(updatedFriends));
    }
  }, [mainUser, friends]);

  useEffect(() => {
    // Ensure mainUser is added to the friends list if it has an id
    if (mainUser.id) {
      addMainUserToFriends();
    }
  }, [mainUser, addMainUserToFriends]); 


  function addFriendToList(newFriend) {
    //check if main user exists
    if(!mainUser || !mainUser.id){
      toast.error('Create a profile before you add a friend.')
      return
    }
    // console.log("addNewFriend-app", newFriend);
    const updatedFriends = [...friends, newFriend];
    setFriends(updatedFriends);
    localStorage.setItem("friendsData", JSON.stringify(updatedFriends));
  }
  //console.log("friends from app", friends);

  function addGroupToList(newGroup) {
    const updatedGroups = { ...newGroup, remainingBudget: Number(newGroup.allottedBudget) };
    setGroups((prevGroups) => [...prevGroups, updatedGroups]);
    localStorage.setItem("groupsData", JSON.stringify([...groups, updatedGroups]));
  }
  //console.log("groups from app:", groups);

  function addExpenseToList(newExpense) {
    // console.log("addNewExpense-app", newExpense);
    const updatedExpenses =[...expenses, newExpense]    
    setExpenses(updatedExpenses);
    localStorage.setItem("expensesData", JSON.stringify(updatedExpenses))

    setGroups(prevGroups =>{
      const updatedGroups = prevGroups.map(group =>{
        if(group.id === newExpense.groupId){
          const updatedRemainingBudget = group.remainingBudget - newExpense.amount;
          // const finalRemainingBudget = updatedRemainingBudget < 0 ? 0 : updatedRemainingBudget;
          return{
            ...group, 
            expenses: group.expenses ? [...group.expenses, newExpense]: [newExpense], 
            remainingBudget: updatedRemainingBudget      
          }
        }
        return group
      })
      localStorage.setItem("groupsData", JSON.stringify(updatedGroups))
      return updatedGroups
    })
  }
  // console.log("expenses from app", expenses);  

  function updateGroup(updatedGroup) {
    setGroups((prevGroups) => {
      const updatedGroups = prevGroups.map((group) =>
        group.id === updatedGroup.id ? {...group, ...updatedGroup} : group
      )
      localStorage.setItem("groupsData", JSON.stringify(updatedGroups))
      return updatedGroups
    })
  }

  function deleteGroup(groupId) {
    setGroups((prevGroups) => {
      const updatedGroups = prevGroups.filter((group) => group.id !== groupId);
      localStorage.setItem("groupsData", JSON.stringify(updatedGroups)); // Update local storage
      return updatedGroups;
    });
  }
  
  function deleteFriend(friendId) {
    setFriends((prevFriends) => {
      const updatedFriends = prevFriends.filter((friend) => friend.id !== friendId);
      localStorage.setItem("friendsData", JSON.stringify(updatedFriends)); // Update local storage
      return updatedFriends;
    });

    setGroups(prevGroups =>{
      const updatedGroups = prevGroups.map(group=>{
        const updatedMembers = group.members ? group.members.filter(member => member.id !== friendId) : [];
        return {...group, members: updatedMembers}
      })
      localStorage.setItem('groupsData', JSON.stringify(updatedGroups))
      return updatedGroups
    })
  }

  function updateExpenseInList(updatedExpense) {
    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? { ...expense, ...updatedExpense } : expense
      );
      localStorage.setItem("expensesData", JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });    

    setGroups((prevGroups) => {
      const updatedGroups = prevGroups.map((group) => {
          if (group.id === updatedExpense.groupId) {
            const updatedGroupExpenses = group.expenses.map((expense) =>
              expense.id === updatedExpense.id ? { ...expense, ...updatedExpense } : expense
            );
    
            const totalExpenses = updatedGroupExpenses.reduce(
              (total, expense) => total + Number(expense.amount),
              0
            );
            const updatedRemainingBudget = Math.max(0, group.allottedBudget - totalExpenses);
    
            return {
              ...group,
              expenses: updatedGroupExpenses,
              remainingBudget: updatedRemainingBudget,
            };
          }
          return group;
      });

      // Save updated groups to local storage
      localStorage.setItem("groupsData", JSON.stringify(updatedGroups));
      return updatedGroups;
  });
  }

  //updates expenses states @ global
  function addParticipantToExpense(expenseId, newParticipant){
    setExpenses(prevExpense =>{
      const updatedExpenses = prevExpense.map(expense=>{
        if(expense.id === expenseId){
          return{
            ...expense,
            participants:[...expense.participants, newParticipant ]
          }
        }
        return expense;
      })
      //update local storage w/ participants
      localStorage.setItem("expensesData", JSON.stringify(updatedExpenses))
      return updatedExpenses
    })
    //Update group w/updated expense
    setGroups(prevGroups =>{
      const updatedGroups = prevGroups.map(group => {
        if(group.id === newParticipant.groupId){
          return{
            ...group,
            expenses: group.expenses.map((expense) =>
              expense.id === expenseId
              ?{
                ...expense,
                participants: [...expense.participants, newParticipant]
              }
              :expense
            )
          }
        }
        return group
      })
      localStorage.setItem("groupsData", JSON.stringify(updatedGroups))
      return updatedGroups
    })
    // console.log("Add update participants in app.jsx",groups)
  }

  function deleteExpenseInList(expenseId) {
    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.filter((expense) => expense.id !== expenseId)
      localStorage.setItem("expensesData", JSON.stringify(updatedExpenses)); // Update local storage
      return updatedExpenses
    })

    setGroups((prevGroups) => {
      const updatedGroups = prevGroups.map((group) => {
        const groupHasExpense = group.expenses.some(expense => expense.id === expenseId);
        
        if (groupHasExpense) {
          const newGroupExpenses = group.expenses.filter((expense) => expense.id !== expenseId);
          const totalExpenses = newGroupExpenses.reduce((total, expense) => total + Number(expense.amount), 0);
          const updatedRemainingBudget = Math.max(0, Number(group.allottedBudget) - totalExpenses);
          
          return {
            ...group,
            expenses: newGroupExpenses,
            remainingBudget: updatedRemainingBudget,
          };
        }
        return group;
      });
      localStorage.setItem("groupsData", JSON.stringify(updatedGroups))
      return updatedGroups
    })
  }

  function handleToggleIsPaid(expenseId, participantId) {
    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.map((expense) => {
        if (expense.id === expenseId) {
          const updatedParticipants = expense.participants.map((participant) =>
            participant.id === participantId
              ? { ...participant, isPaid: !participant.isPaid }
              : participant
          );
          return { ...expense, participants: updatedParticipants };
        }
        return expense;
      });
      localStorage.setItem("expensesData", JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });

    setGroups((prevGroups) => {
      const updatedGroups = prevGroups.map((group) => {
        const updatedExpenses = group.expenses.map((expense) => {
          if (expense.id === expenseId) {
            const updatedParticipants = expense.participants.map(
              (participant) =>
                participant.id === participantId
                  ? { ...participant, isPaid: !participant.isPaid }
                  : participant
            );
            return { ...expense, participants: updatedParticipants };
          }
          return expense;
        });
        return { ...group, expenses: updatedExpenses };
      });

      localStorage.setItem("groupsData", JSON.stringify(updatedGroups));
      return updatedGroups;
    });
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Home />,
          children: [
            {
              path:"expenses-user",
              element:<ExpensesUser />
            },
            {
              path:"statistics",
              element:<Statistics />
            }
          ]
        },
        {
          path: "profile",
          element: <Profile />,

        },
        {
          path: "mobile-groups",
          element: <MobileGroupsPage />,
        },
        {
          path: "mobile-friends",
          element: <MobileFriendsPage />,
        },
        {
          path: "group/:groupId",
          element: <Groups />,
          children: [
            {
              path:"expenses",
              element:<Expenses />
            },
            {
              path:"statistics",
              element:<Statistics />
            }
          ]
        },
        {
          path: "friend/:friendId",
          element: <Friends />,
        },
      ],
    },
  ]);

  return (
    <AppContext.Provider
      value={{
        mainUser,
        setMainUser,
        addMainUserToFriends,
        groups,
        setGroups,
        updateGroup,
        addGroupToList,
        deleteGroup,
        friends,
        setFriends,
        addFriendToList,
        deleteFriend,
        memberData,
        setMemberData,
        expenses,
        setExpenses,
        addExpenseToList,
        updateExpenseInList,
        participantData,
        setParticipantData,
        addParticipantToExpense,
        deleteExpenseInList,
        handleToggleIsPaid,
        showNotification,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;