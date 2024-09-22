import PropTypes from 'prop-types'

// eslint-disable-next-line react/prop-types

const GroupTypeSelection = ({ handleChange, groupsData }) => {
  const groupTypes = ['Games', 'Business', 'Party', 'Fun', 'Trip', 'House', 'Other']
  return (
    <>
  
      <p className='mt-4 text-sm'>Group type*</p>
      <div className="flex items-center gap-2 mt-2">
        {groupTypes.map(category =>{
          return(
          <label 
            key={category}
            className={`text-sm pr-2 py-2 border rounded-md cursor-pointer border-border ${
              groupsData.category === category
                ? 'bg-button text-gray'
                : 'bg-zinc-50 text-black'
            }`}>
          <input
            className="invisible"
            type="radio"
            name="category"
            value={category}
            checked={groupsData.category === category}          
            onChange={handleChange}
          />
          {category}
        </label>)
        })}
      </div>
    </>
  )
}
GroupTypeSelection.propTypes ={
  handleChange: PropTypes.func.isRequired,
  groupsData: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
}

export default GroupTypeSelection