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
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#D1D5DB" : "white",
      color: state.isActive ? "black" : "",
      "&:active": {
        backgroundColor: "#D1D5DB",
      },
      fontSize:'12px'   
    }),
    control:(provided)=>({
      ...provided,
      fontSize:'12px'
    })
  };

  return(
    <>      
      <Select 
        defaultValue={null}
        onChange={(selectedOption)=>handleChange(selectedOption, 'category')}
        options={options} 
        placeholder="Choose a category"
        styles={customStyles}
      />
    </>
  )

}
ExpenseCategorySelection.propTypes ={
  handleChange: PropTypes.func.isRequired,}

export default ExpenseCategorySelection