import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root.jsx";
import ErrorPage from "./pages/Error.jsx";
import Profile from "./pages/Profile.jsx";
import Groups from "./pages/Groups.jsx";
import Friends from "./pages/Friends.jsx";
import Home from "./pages/Home.jsx";
import { createContext, useState } from "react";
import Expenses from "./pages/Expenses.jsx";
import Statistics from "./pages/Statistics.jsx"
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
  const [memberData, setMemberData] = useState({ name: "", share: "", id: "" });

  function addFriendToList(newFriend) {
    console.log("addNewFriend-app", newFriend);
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
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
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

  function updateExpenseInList(updatedExpense) {
    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? { ...expense, ...updatedExpense } : expense
      );
      localStorage.setItem("expensesData", JSON.stringify(updatedExpenses));
      return updatedExpenses;
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
        },
        {
          path: "profile",
          element: <Profile />,
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
        memberData,
        setMemberData,
        expenses,
        addExpenseToList,
        updateExpenseInList 
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
