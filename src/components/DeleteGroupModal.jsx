// import React from 'react';
import PropTypes from 'prop-types';

const DeleteGroupModal = ({ isOpen, onConfirm, onCancel, groupName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Delete Group Confirmation</h2>
        <p className="mb-4">Are you sure you want to delete the {groupName} group?</p>
        <p className="mb-6 text-sm text-gray-600">All open expenses will be removed, and any money accumulated so far will be refunded to the respective members.</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete Group</button>
        </div>
      </div>
    </div>
  );
};

DeleteGroupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  groupName: PropTypes.string.isRequired,
};

export default DeleteGroupModal;