import PropTypes from 'prop-types';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, title, message, confirmButtonText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 ">
      <div className="relative bg-white pt-6 pl-6 pr-6 pb-16 rounded-[8px] shadow-xl max-w-[535px] w-full">
        <h2 className="text-[14px] mb-3 font-medium text-title">{title}</h2>
        <div className="border-t bg-border h-[1px]"/>
        <p className="text-[12px] mt-4 leading-[16.5px] text-modal-text">
          {message}
        </p>
        <div className="absolute bottom-0 right-0 flex items-center w-full p-2 bg-light-indigo place-content-end rounded-b-[8px]">
          {onCancel &&( 
            <button onClick={onCancel} className="font-normal text-sm px-3 py-2 mr-2 text-gray-600 rounded-[8px] hover:text-gray-800">Cancel</button>
          )}          
          <button onClick={onConfirm} className="px-3 py-2 mr-2 text-sm bg-red-600 rounded-lg hover:bg-red-800 text-light-indigo">{confirmButtonText}</button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmButtonText: PropTypes.string.isRequired,
};

export default ConfirmationModal;
