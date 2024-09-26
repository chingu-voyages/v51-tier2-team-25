import Select from "react-select"
import PropTypes from 'prop-types'


const ExpenseCategorySelection = ({ handleChange }) => {

  const options=[
    { value: "rentMortgage",label:"Rent/Mortgage 🏠" },
    { value: "utilities",label:"Utilities 💡" },
    { value: "groceries",label:"Groceries 🛒" },
    { value: "fastFood",label:"Fast Food 🍔" },
    { value: "diningOut",label:"Dining Out 🍽️"},
    { value: "transportation",label:"Transportation 🚗"},
  ]

  return(
    <>
      <label className='text-sm'>
        Category*
        <Select 
          defaultValue={null}
          onChange={(selectedOption)=>handleChange(selectedOption, 'category')}
          options={options} 
          placeholder="Choose a category"
        />
      </label>
      
    </>
  )

}
ExpenseCategorySelection.propTypes ={
  handleChange: PropTypes.func.isRequired,}

export default ExpenseCategorySelection