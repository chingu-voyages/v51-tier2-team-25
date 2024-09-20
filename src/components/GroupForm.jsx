import { useState } from 'react'
import PropTypes from 'prop-types'

const GroupForm =({ onClose }) => {
 
  const generateGroupId = () => {
    return Math.floor(10000 + Math.random() * 900000)
  }
  // Initialize state for formData
  const [formData, setFormData] = useState(
    {
      groupName:'',
      groupId: generateGroupId(),
      groupDescription:'',
      allottedBudget:'',
    }
  )
   
  // Handle input changes and updates form data state
  const handleChange = (e) =>{
    //**TEST console.log('changed')
    const { name, value } = e.target //Get name and value from input field   
  
    setFormData(prevFormData =>({        
        ...prevFormData, //spread prev form data
        [name]: value  //update field       
    }))       
  }

  const cancelForm = () => {
    setFormData({
      groupName:'',
      groupId:'',
      groupDescription:'',
      allottedBudget:'',
    })
    //regenerate groupId after from submission
    setFormData(prevFormData => ({
      ...prevFormData,
      groupId:generateGroupId()
    }))
    //**TEST console.log("Form Canceled")
  }

  const renderGroupId = () => {
    return formData.groupId ? <p className='absolute p-0 m-0 text-xs text-gray-400 top-1 right-10'>#{formData.groupId}</p> : null
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    //perform additional validation  ?  

    //get stored data from local storage or initialize array
    let storedGroupData = JSON.parse(localStorage.getItem('formData')) || []

    //append new form data to array
    storedGroupData.push(formData)

    //save updated array to local storage
    localStorage.setItem('formData', JSON.stringify(storedGroupData))

    //clear form
    setFormData({
      groupName:'',
      groupId:'',
      groupDescription:'',
      allottedBudget:'',
    })

    //regenerate groupId after from submission
    setFormData(prevFormData => ({
      ...prevFormData,
      groupId:generateGroupId()
    }))

    //**TEST log to verify data
    console.log('localStorage Data:', localStorage.getItem('formData'))
    console.log('storedData:', storedGroupData)

    alert("Form Submitted")

  }

  const handleOnClose = () =>{
    if (typeof onClose === 'function'){
      onClose()
    }else{
      console.warn('onClose is not a function')
    }
  }

  return (
    <> 
      <div className='relative border border-black-100 w-[535px] h-[625px] rounded-md p-6 flex flex-col m-8 font-geologica'>
        <p className='absolute top-0 p-0 m-0 text-gray-400 cursor-pointer right-2 text-s'  onClick={handleOnClose}>&times;</p>
        <div className='flex items-center justify-between pb-4 mb-5 border-b border-black-200'>
          <h1 className='p-0 text-md'>New Group</h1>
          <p className='p-0 text-xs text-gray-400'>* Mandatory fields</p>
        </div>
        
        <form onSubmit={handleSubmit} className='flex flex-col flex-1 gap-6 overflow-auto border border-none'>

          <div className='flex items-center'>
            {/* TODO CHANGE PIC */}
            <img src='./public/images/placeholder.jpg' className='border border-none rounded-full w-[80px] h-[80px] mr-4'/>  

            <div className='relative flex'>
              <label className='text-sm'>
                Group name*                              
                <input 
                  className='w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9'
                  type='text'
                  name='groupName'
                  value={formData.groupName}
                  onChange={handleChange}
                  maxLength="30"
                  required          
                />
              </label>
              {renderGroupId()} 
            </div>            

            <label className='ml-2 text-sm'>
              Allotted budget
              <input 
                className='w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9'
                type='number'
                step='0.01'
                min='0'
                name='allottedBudget'
                value={formData.allottedBudget}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          
          <label className='flex flex-col text-sm '>
            Group description*
            <textarea 
              className='border border-gray-300 rounded-md h-[72px] w-full text-left mt-1 p-2 text-gray-500'              
              name='groupDescription'
              value={formData.groupDescription}
              onChange={handleChange}
              required
            />
          </label>

          <div className='mb-auto'>
            <p className='text-gray-200'>placeholder</p>
          </div>

          <div className='absolute bottom-0 left-0 right-0 flex items-center w-full pr-4 bg-gray-200 place-content-end'>
            <button className='text-sm' type='button' onClick={cancelForm}>Cancel</button>
            <button className='px-4 py-2 m-2 text-sm hover:bg-hover bg-button text-gray-50 rounded-xl'type='submit'>Create group</button>
          </div>

        </form>
      </div>
    </>
    
  )
}

GroupForm.propTypes = {
  onClose: PropTypes.func.isRequired,
}
export default GroupForm
