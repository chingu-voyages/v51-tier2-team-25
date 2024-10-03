import Select from "react-select"
import PropTypes from 'prop-types'
import {useState, useEffect, useMemo } from 'react'

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

const ExpenseCategorySelection = ({ handleChange, category }) => {

  const [selectedCategory, setSelectedCategory]=useState(null)

  //useMemo to ensure options is stable and not recreated @ each render
  const options= useMemo(()=> [
    { value: "rent_mortgage",label:"Rent/Mortgage 🏠" },
    { value: "utilities",label:"Utilities 💡" },
    { value: "groceries",label:"Groceries 🛒" },
    { value: "fast_food",label:"Fast Food 🍔" },
    { value: "dining_out",label:"Dining Out 🍽️"},
    { value: "transportation",label:"Transportation 🚗"},
    { value: "travel_trips", label: "Travel & Trips ✈️" },
    { value: "shared_apps_software", label: "Shared Apps & Software 💻" },
    { value: "garden_outdoor", label: "Garden & Outdoor 🌳" },
    { value: "childcare", label: "Childcare 👶" },
    { value: "insurance", label: "Insurance 🛡️" },
    { value: "household_items", label: "Household Items 🧹" },
    { value: "subscriptions", label: "Subscriptions 📱" },
    { value: "pet_expenses", label: "Pet Expenses 🐾" },
    { value: "health_wellness", label: "Health & Wellness 🏋️" },
    { value: "entertainment", label: "Entertainment 🎬" },
    { value: "miscellaneous", label: "Miscellaneous 🧾" },
    

  ], [])


  //update local state when parent sends new category
  useEffect(()=>{
    if(category){
      const foundCategory = options.find(option => option.value === category)
      setSelectedCategory(foundCategory || null)
    }
  },[category,options])

  const handleCategoryChange =(selectedOption) =>{
    setSelectedCategory(selectedOption)   
    handleChange(selectedOption,'category')
  }

  return(
    <>      
      <Select 
        value={selectedCategory}
        onChange={handleCategoryChange}
        options={options} 
        placeholder="Choose a category"
        styles={customStyles}
        isClearable
      />
    </>
  )

}
ExpenseCategorySelection.propTypes ={
  handleChange: PropTypes.func.isRequired,
  category: PropTypes.string,
}

export default ExpenseCategorySelection