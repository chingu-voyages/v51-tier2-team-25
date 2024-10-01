import { useContext } from "react"
import { AppContext } from "../App";

const RemainingBudget = ({ groupId }) =>{
  const { groups } = useContext(AppContext) 

  const group = groups.find(group => group.id === Number(groupId))
  
  console.log("group log expenses:", group.expenses)

  const totalExpenses = group.expenses
    .map(expense => Number(expense.amount))
    .reduce((sum, amount)=> sum + amount, 0)
  
  console.log(`totalExp ${group.name}`, totalExpenses)

  const budget = group ? Number(group.allottedBudget) : 0
  // console.log ("Group budget:", typeof budget)

  const remainingBudget = budget - totalExpenses

  return (remainingBudget)
}

export default RemainingBudget

  

