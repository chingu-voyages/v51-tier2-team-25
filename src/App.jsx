import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState} from "react";
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

export const AppContext = createContext([]);

function App() {
  const [groups, setGroups] = useState(
    JSON.parse(localStorage.getItem("groupsData")) || []
  );
  const [friends, setFriends] = useState(
    JSON.parse(localStorage.getItem("friendsData")) || []
  );
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expensesData")) || []
  );

  const [memberData, setMemberData] = useState({ name: "", id: "" });

  //members added from group to expense
  const [participantData, setParticipantData] = useState({name:"", id:""})


  function addFriendToList(newFriend) {
    // console.log("addNewFriend-app", newFriend);
    const updatedFriends = [...friends, newFriend];
    setFriends(updatedFriends);
    localStorage.setItem("friendsData", JSON.stringify(updatedFriends));
  }
  console.log("friends from app", friends);

  function addGroupToList(newGroup) {
    console.log("addNewGroup-app", newGroup);
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  }
  console.log("groups from app:", groups);

  function addExpenseToList(newExpense) {
    console.log("addNewExpense-app", newExpense);
    //update expenses state
    const updatedExpenses =[...expenses, newExpense]    
    setExpenses(updatedExpenses);
    localStorage.setItem("expensesData", JSON.stringify(updatedExpenses))

    //update specific group w/ new expense
    setGroups(prevGroups =>{
      const updatedGroups = prevGroups.map(group =>{
        if(group.id === newExpense.groupId){
          return{
            ...group, 
            expenses: group.expenses ? [...group.expenses, newExpense]: [newExpense],            
          }
        }
        return group
      })
      //save updated groups to local storage
      localStorage.setItem("groupsData", JSON.stringify(updatedGroups))
      return updatedGroups
    })
  }
  console.log("expenses from app", expenses);  

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
  }

  // function updateExpenseInList(updatedExpense) {
  //   setExpenses((prevExpenses) => {
  //     const updatedExpenses = prevExpenses.map((expense) =>
  //       expense.id === updatedExpense.id ? { ...expense, ...updatedExpense } : expense
  //     );
  //     localStorage.setItem("expensesData", JSON.stringify(updatedExpenses));
  //     return updatedExpenses;
  //   });    
  // }

  //////////////////////////////////////////////////updated group and expenses rendering

  function updateExpenseInList(updatedExpense) {
    setGroups((prevGroups) => {
      return prevGroups.map((group) => {
        // Check if the group contains the expense
        const hasExpense = group.expenses.some(expense => expense.id === updatedExpense.id);
        if (hasExpense) {
          return {
            ...group,
            expenses: group.expenses.map((expense) =>
              expense.id === updatedExpense.id ? { ...expense, ...updatedExpense } : expense
            )
          };
        }
        return group;
      });
    });
  
    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? { ...expense, ...updatedExpense } : expense
      );
      localStorage.setItem("expensesData", JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
  }
/////////////////////////////////////////////////////  

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

    //update group
    setGroups(prevGroups => {
      const updatedGroups = prevGroups.map(group => {
        return{
          ...group,
          expenses: group.expenses.filter(expense => expense.id !==  expenseId)
        }
      })
      localStorage.setItem("groupsData", JSON.stringify(updatedGroups))
      return updatedGroups
    })
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
        groups,
        updateGroup,
        addGroupToList,
        deleteGroup,
        friends,
        addFriendToList,
        deleteFriend,
        memberData,
        setMemberData,
        expenses,
        addExpenseToList,
        updateExpenseInList,
        participantData,
        setParticipantData,
        addParticipantToExpense,
        deleteExpenseInList,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;