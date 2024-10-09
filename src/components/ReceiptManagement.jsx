import { useDropzone } from 'react-dropzone'
import { useState, useCallback, useEffect, forwardRef, useImperativeHandle, useContext } from 'react'
import { AppContext } from "../App";
import { db, storage } from '../../firebase'
import { getDownloadURL, uploadBytes, ref as firebaseRef,deleteObject } from 'firebase/storage'
import { collection, addDoc, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types';

//Each receipt should have a unique id and be under expense id

const ReceiptManagement = forwardRef(({ expenseId, isEditable }, ref) => {
  const { showNotification } = useContext(AppContext);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  //Fetch receipts
  useEffect(()=>{
    if (isEditable && expenseId){
      const fetchReceipts = async () =>{
        const q = query(collection(db,'receipts'), where('expenseId', '==', expenseId))
        const querySnapshot = await getDocs(q)
        const receipts = querySnapshot.docs.map(doc =>({
          id: doc.id,
          ...doc.data(),
        }))
        setSelectedImages(receipts)
      }    
      fetchReceipts()
    }
  },[expenseId, isEditable])

  // Callback function to append new files to selectedImages and generate preview URLs
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImages((prev) => [
      ...prev,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {  
          preview:URL.createObjectURL(file) 
        })
      )
    ])
  }, []);

  // Hook to manage the dropzone functionality
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': [],
    },
    multiple: true, // Allows multiple files to be selected
  });

  // // Function to remove an image
  // const handleFileRemove = (index) => {
  //   setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  // };

  // Cleanup preview URLs on component unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      selectedImages.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [selectedImages]);

  // Upload receipts to Firebase Storage & store URLs in Firestore
  const uploadReceiptsToFirebase = async () => {
    setUploading(true);
    const uploadedFiles = [];

    try {
      console.log('Starting to upload receipts:', selectedImages.length, 'files');

      for (const file of selectedImages) {
        const fileId = uuidv4();

        // Check file size (limit to 5MB)
        if (file.size / 1024 / 1024 > 5) {
          showNotification(`${file.name} exceeds the 5MB file size limit`, 'error');
          continue; // Skip this file if it exceeds the limit
        }

        const fileRef = firebaseRef(storage, `receipts/${expenseId}/${fileId}`);

        try {
          // Upload file to Firebase Storage
          console.log(`Uploading file: ${file.name}`);
          await uploadBytes(fileRef, file);
          const fileUrl = await getDownloadURL(fileRef);
          uploadedFiles.push({ fileId, fileUrl });

          console.log('File uploaded successfully:', file.name);
          console.log('File URL:', fileUrl);

          // Store the file URL in Firestore under the 'receipts' collection
          const receiptsCollection = collection(db, 'receipts');
          const docData = {
            expenseId,
            fileUrl,
            fileId,
            uploadedAt: new Date(),
          };

          console.log('Attempting to write to Firestore with data:', docData);
          await addDoc(receiptsCollection, docData);
          console.log('Document successfully written for file:', file.name);
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error.message);
          showNotification(`Error uploading ${file.name}: ${error.message}`, 'error');
        }
      }

      showNotification('Receipts uploaded successfully', 'success');
    } catch (error) {
      console.error('Error in uploadReceiptsToFirebase:', error);
      showNotification(`Error uploading receipts: ${error.message}`, 'error');
    } finally {
      setUploading(false);
    }

    return uploadedFiles;
  }; 

  //Delete receipt from firestore/firebase
  const handleDeleteReceipt = async(receiptId, fileUrl)=>{
    if (!isEditable) return;
    try{
      //Delete from Firestore
      const receiptRef = doc(db, 'receipts', receiptId)
      await deleteDoc(receiptRef)
      console.log('Deleted from Firestore:', receiptId)

      //Delete from Firebase Storage
      const storageRef = firebaseRef(storage, fileUrl)
      await deleteObject(storageRef)
      console.log('Deleted from Storage:', fileUrl)

      //Remove from UI
      setSelectedImages(prev =>
        prev.filter(receipt => receipt.fileId !== receiptId)
      )

      showNotification('Receipt deleted successfully', 'success')

    }catch(error){
      console.error('Error deleting receipt:', error)
      showNotification(`Error deleting receipt: ${error.message}`)
    }
  }
  
  useImperativeHandle(ref, () => ({
    uploadReceiptsToFirebase,
  }));
  
  const renderPreviewsWithDelete = () => (
    <div className="w-full h-auto p-2 mt-1 text-center text-gray-500 border border-gray-300 border-dashed rounded-md">
      <p>Drag & drop more receipt images or click to select</p>
      <div className="grid grid-cols-1 gap-2">
        {selectedImages.map((receipt) => (
          <div
            key={receipt.fileId}
            className="flex flex-col items-center w-full h-[104px] p-3 text-sm text-center text-gray-500 border border-gray-300 border-dashed rounded-md"
          >
            <img src={receipt.fileUrl || receipt.preview} alt="Receipt" className="h-12 pb-3 rounded-med" />
            <p className="pb-1 text-xs text-gray-600">
              <span className="font-bold">Receipt</span> attached
            </p>
            {isEditable && (
              <div className="flex gap-4">
              <button
                type="button"
                className="text-xs text-gray-600"
                onClick={() => handleDeleteReceipt(receipt.fileId, receipt.fileUrl)}
              >
                Delete
              </button>
            </div>
            )}
            
          </div>
        ))}
      </div>
    </div>
  );

  // Instructions to show when no images/files are selected
  const inputSection = () => (
    <div
      {...getRootProps()}
      className="w-full h-auto p-2 mt-1 text-center text-gray-500 border border-gray-300 border-dashed rounded-md"
    >
      <input {...getInputProps()} />
      <p>Upload receipt image or drag and drop</p>
      <p>.png, .jpeg, .heic, .pdf, up to 5MB</p>
      <p>PDF supports only one page</p>
    </div>
  );

  return (
    <>
      <p className="flex flex-col mb-4 text-sm">Attachments</p>
      {uploading ? (
        <div className="flex items-center">Uploading...</div>
      ) : (
        <div className="flex flex-col items-center">
          {selectedImages.length > 0 ? renderPreviewsWithDelete() : inputSection()}
        </div>
      )}
    </>
  );
});




ReceiptManagement.propTypes = {
  expenseId: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired,
};
ReceiptManagement.displayName = 'ReceiptManagement';

export default ReceiptManagement
