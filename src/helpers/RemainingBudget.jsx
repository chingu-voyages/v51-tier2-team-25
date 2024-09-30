import { useContext } from "react"
import { AppContext } from "../App";

const RemainingBudget = ({ groupId }) =>{
  const { groups } = useContext(AppContext) 

  const group = groups.find(group => group.id === Number(groupId))
  
  // console.log("group log expenses:",group.expenses)

  const totalExpenses= group.expenses.map(expense => expense.amount)
    .reduce((sum, expense)=> sum + expense.amount)
  
  // console.log(`totalExp ${group.name}`, totalExpenses)

  const budget = group ? group.allottedBudget : 0
  // console.log ("Group budget:", budget)

  const remainingBudget = budget - totalExpenses

  return (remainingBudget)
}

export default RemainingBudget

  

