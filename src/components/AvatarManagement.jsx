import { useRef } from 'react'
import PropTypes from 'prop-types'; 

const AvatarManagement = ({avatar, onAvatarChange, showText=true}) =>{
  const avatarInput = useRef(null)

  const handleAvatarChange = (e) =>{
    const file = e.target.files[0]
    if (file){
      const reader = new FileReader()
      reader.onload = () =>{
        onAvatarChange(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  return(
    <>
      <div className='flex items-end mb-4'>
        {avatar ? (
          <img src={avatar} alt="Avatar" className="object-cover w-24 h-24 border-2 rounded-full border-border" />
        ) : (
          <img src="../../images/placeholder.jpg" alt="Placeholder Avatar " className="object-cover w-24 h-24 border border-gray-300 rounded-full"/>
        )}

        <button
          type='button'
          onClick={()=> avatarInput.current.click()}
          className="flex items-center h-6 gap-1 p-1 -ml-6 text-xs text-gray-600 border rounded-lg border-input-border bg-zinc-50"
        >
          <img src="../../images/Image.svg" className='h-3'/>
          {showText && <span>Select Photo</span>}          
        </button>
      </div>

      <input 
        type='file'
        name='avatar'
        accept='image/*'
        ref={avatarInput}
        onChange={handleAvatarChange}
        style={{display:'none'}}                    
      />  
    </>
  )
}
AvatarManagement.propTypes = {
  avatar: PropTypes.string, 
  onAvatarChange: PropTypes.func.isRequired, 
  showText: PropTypes.bool
  
};

export default AvatarManagement