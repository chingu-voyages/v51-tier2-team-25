//displays receipt fetched from firebase
import PropTypes from "prop-types"

const ViewReceipt = ({ closeReceipt, fileUrls }) => {
  console.log("Rendering receipts with URLs:", fileUrls); // Log fileUrls to debug

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto bg-gray-800 bg-opacity-75">
      <div className="relative w-full max-w-2xl p-4 bg-white rounded-md shadow-lg"> 
        
        <div className="flex flex-col gap-4 overflow-y-auto pb-14">
          {fileUrls && fileUrls.length > 0 ? (
            fileUrls.map((url, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={url}
                  alt={`Receipt ${index + 1}`}
                  className="object-contain max-h-52"
                  onError={() => console.error(`Failed to load image at ${url}`)} // Handle image load failure
                />
              </div>
            ))
          ) : (
            <p>No receipts available.</p>
          )}
        </div>

        <div className="absolute bottom-0 left-0 flex items-center w-full p-2 bg-light-indigo place-content-end rounded-b-md">
          <button
            onClick={closeReceipt}
            className="px-3 py-2 ml-2 text-sm border-none rounded-lg h-9 hover:bg-hover bg-button text-light-indigo"
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