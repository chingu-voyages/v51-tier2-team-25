//displays receipt fetched from firebase
import PropTypes from "prop-types"

const ViewReceipt = ({closeReceipt, fileUrl}) => {

  console.log("fileUrl in view receipt", fileUrl)
  return(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 ">

      <div className="relative bg-white pt-6 pl-6 pr-6 pb-16 rounded-[8px] shadow-xl h-[535px] w-[535px] flex items-center justify-center">    
        {fileUrl ? (
          <img src={fileUrl} alt="Receipt" className="object-contain max-w-full max-h-full"/>
        ):(
          <p>Loading...</p>
        )}    
        <div className="absolute bottom-0 left-0 right-0 flex items-center w-full p-2 bg-light-indigo place-content-end rounded-b-[8px]">
          <button onClick={closeReceipt} className="font-normal text-sm px-3 py-2 mr-2 text-gray-600 rounded-[8px] hover:text-gray-800">Close</button>          
        </div>
      </div>
  </div>
  )
}
ViewReceipt.propTypes = {
  closeReceipt: PropTypes.func.isRequired, 
  fileUrl: PropTypes.string
};


export default ViewReceipt