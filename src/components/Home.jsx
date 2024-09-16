import { useState } from 'react'
import GroupForm from "./GroupForm";


const Home = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleButtonClick = () =>{
    setModalOpen(false)
  }

  return (
    <div>
      <button className='px-4 py-2 m-2 text-sm text-gray-100 bg-button hover:bg-hover rounded-xl'onClick={()=>setModalOpen(true)}>Add group</button>
      {modalOpen && (
        <GroupForm 
        onClose={handleButtonClick}
      />
      )}
      
    </div>
  );
};

export default Home;
