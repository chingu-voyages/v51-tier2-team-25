import Select from "react-select"
import PropTypes from 'prop-types'
import {useState, useEffect, useMemo } from 'react'


const ExpenseCategorySelection = ({ handleChange, category }) => {

  const [selectedCategory, setSelectedCategory]=useState(null)

  //useMemo to ensure options is stable and not recreated @ each render
  const options= useMemo(()=> [
    { value: "rentMortgage",label:"Rent/Mortgage 🏠" },
    { value: "utilities",label:"Utilities 💡" },
    { value: "groceries",label:"Groceries 🛒" },
    { value: "fastFood",label:"Fast Food 🍔" },
    { value: "diningOut",label:"Dining Out 🍽️"},
    { value: "transportation",label:"Transportation 🚗"},
  ], [])

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

  //update local state when parent sends new category
  useEffect(()=>{
    if(!category){
      setSelectedCategory(null)
    }else{
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