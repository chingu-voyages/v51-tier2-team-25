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
      <div className="relative p-4 bg-white rounded-md h-96 w-80">

        <div className="flex flex-col justify-between gap-4 overflow-hidden pb-14">
          {fileUrls && fileUrls.length > 0 ? (
            <div className="flex flex-col justify-between">
            {/* Image Display */}
              <img
                src={fileUrls[currentIndex]}
                alt={`Receipt ${currentIndex + 1}`}
                className="object-contain max-h-72"
                onError={() =>
                  console.error(`Failed to load image at ${fileUrls[currentIndex]}`)
                }
              />
             {/* Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={handlePrev}
                  className=""
                >
                  <img src="../../images/ArrowLeft2.svg" />
                </button>
                <div className="">
                  {currentIndex + 1} / {fileUrls.length}
                </div>
                <button
                  onClick={handleNext}
                  className=""
                >
                  <img src="../../images/ArrowRight2.svg" />
                </button>
              </div>
            </div>
            
          ) : (
            <p>No receipts available.</p>
          )}
        </div>

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