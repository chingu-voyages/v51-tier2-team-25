import PropTypes from 'prop-types';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
<div className="fixed inset-0 z-50 flex items-start justify-center bg-gray-800 bg-opacity-75 ">
<div className="relative bg-white pt-6 pl-6 pr-6 pb-16 mt-10 rounded-[8px] shadow-xl max-w-[535px]">
  <h2 className="text-[14px] mb-3 font-medium text-title">Close Overlay?</h2>
  <div className="border-t bg-border h-[1px]"/>
  <p className="text-[12px] text-gray-600 mt-4 leading-[16.5px] text-modal-text">
     Are you sure you want to close this overlay? All entered information will be lost.
  </p>
  <div className="absolute bottom-0 left-0 right-0 flex items-center w-full p-2 bg-light-indigo place-content-end rounded-b-[8px]">
    <button onClick={onCancel} className="font-normal text-sm px-3 py-2 mr-2 text-gray-600 rounded-[8px] hover:text-gray-800">Cancel</button>
    <button onClick={onConfirm} className="font-bold text-sm px-3 py-2 mr-2  bg-red-600 rounded-lg hover:bg-red-800 text-light-indigo">Close Without Saving</button>
  </div>
</div>
</div>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal;
