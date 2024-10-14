//displays receipt fetched from firebase
import PropTypes from "prop-types"
import {useState} from 'react'

const ViewReceipt = ({ closeReceipt, fileUrls }) => {
  // console.log("Rendering receipts with URLs:", fileUrls); // Log fileUrls to debug

  const [currentIndex, setCurrentIndex] =useState(0)

  const handleNext = () =>{
    setCurrentIndex(prevIndex => (prevIndex + 1) % fileUrls.length)
  }

  const handlePrev = () => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? fileUrls.length -1 : prevIndex - 1)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto bg-gray-800 bg-opacity-75">
      <div className="relative p-4 bg-white rounded-md h-[25rem] w-80 flex flex-col">
    
        {/* Image Display */}
        <div className="flex items-start justify-center flex-1 overflow-hidden">
          {fileUrls && fileUrls.length > 0 ? (
            <div className="flex flex-col items-center h-full">
              <img
                src={fileUrls[currentIndex]}
                alt={`Receipt ${currentIndex + 1}`}
                className="object-contain max-w-full max-h-[20rem]"
                onError={() =>
                  console.error(`Failed to load image at ${fileUrls[currentIndex]}`)
                }
              />
            </div>
          ) : (
            <p>No receipts available.</p>
          )}
        </div>

        {/* Navigation Buttons (Prev/Next) */}
        <div className="flex items-center justify-between pb-12 mt-2">
          <button onClick={handlePrev} className="">
            <img src="../../images/ArrowLeft2.svg" alt="Previous" />
          </button>
          {fileUrls && fileUrls.length > 0 ? (
            <div>{currentIndex + 1} / {fileUrls.length}</div>
          ):(<p className='text-xs text-input-text'>Empty</p>)}
          <button onClick={handleNext} className="">
            <img src="../../images/ArrowRight2.svg" alt="Next" />
          </button>
        </div>

        {/* Close Button */}
        <div className="absolute bottom-0 left-0 flex items-center w-full p-2 bg-light-indigo place-content-end rounded-b-md">
          <button
            onClick={closeReceipt}
            className="relative bottom-0 px-3 py-2 ml-2 text-sm border-none rounded-lg h-9 hover:bg-hover bg-button text-light-indigo"
          >
            Close
          </button>
        </div>
      </div>
    </div>

  );
};

ViewReceipt.propTypes = {
  closeReceipt: PropTypes.func.isRequired, 
  fileUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default ViewReceipt