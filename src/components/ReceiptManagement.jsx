import { useDropzone } from 'react-dropzone'
import { useState, useCallback, useEffect, forwardRef, useImperativeHandle, useContext } from 'react'
import { AppContext } from "../App";
import { db, storage } from '../../firebase'
import { getDownloadURL, uploadBytes, ref as firebaseRef } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types';

//Each receipt should have a unique id and be under expense id

const ReceiptManagement = forwardRef(({ expenseId }, ref) => {
  const {showNotification}=useContext(AppContext)
  // console.log('expenseId', expenseId)
  
  const [ selectedImages, setSelectedImages ]= useState([])  
  const [ uploading, setUploading ]= useState(false)

  // console.log('db', db)
  // console.log('storage', storage)

 //callback fxn that generate url for file preview
  const onDrop = useCallback(acceptedFiles => {
    setSelectedImages((prev) => [
      ...prev,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {  
          preview:URL.createObjectURL(file) 
        })
      )
    ])
  }, [])

  //hook that handles drag & drop functionality
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      'image/*':[],
      'application/pdf':[]
    },
   })

  const handleFileRemove = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  // cleanup urls on component unmount to avoid memory leaks
  useEffect (()=>{
    return () =>{
      selectedImages.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [selectedImages])

  // Upload receipts to Firebase Storage & store URLs in firestore
  const uploadReceiptsToFirebase = async () => {
    console.log('uploadReceiptsToFirebase function called');
    setUploading(true)
    const uploadedFiles =[]

    try{
      console.log(`Number of files to upload: ${selectedImages.length}`);
      for(const file of selectedImages){
        console.log(`Processing file: ${file.name}`);
        const fileId = uuidv4()
        console.log(`Generated fileId: ${fileId}`);

        // Check file size (limit to 5MB)
        if (file.size / 1024 / 1024 > 5) {
          showNotification(`${file.name} exceeds the 5MB file size limit`,'error');
          continue;  // Skip this file if it exceeds the limit
        }

        const fileRef = firebaseRef(storage, `receipts/${expenseId}/${fileId}`)
        console.log(`Created storage reference: ${fileRef.fullPath}`);

        console.log(`Uploading ${file.name}`)
        try{
          //Upload file to storage
          await uploadBytes(fileRef, file) 
          console.log(`File uploaded successfully: ${file.name}`);
        }catch(uploadError){
          console.error(`Error uploading file ${file.name}:`, uploadError);
          throw uploadError;
        }
        
        console.log(`Getting download URL for file: ${file.name}`)
        let fileUrl;
        try{
          // Get download URL
          fileUrl = await getDownloadURL(fileRef)
          console.log(`Got download URL: ${fileUrl}`);
        }catch (urlError){
          console.error(`Error getting download URL for ${file.name}:`, urlError);
          throw urlError;
        }
        
        uploadedFiles.push({ fileId, fileUrl })
  
        //store each file URL in firestore under 'receipts' collection
        console.log(`Writing metatdata to Firestore for file: ${file.name}`)
        const receiptsCollection = collection(db, 'receipts')
        try{
          const docData ={
            expenseId,
            fileUrl,
            fileId,
            uploadedAt: new Date()
          }
          console.log('Document data to be written:', docData);

          const docRef = await addDoc(receiptsCollection, docData)
          console.log(`Document written with ID: ${docRef.id}`);
        }catch(firestoreError){
          console.error(`Error writing to Firestore for ${file.name}:`, firestoreError);
          console.log('Error code:', firestoreError.code);
          console.log('Error message:', firestoreError.message);
          if (firestoreError.details) {
            console.log('Error details:', firestoreError.details);
          }
          throw firestoreError;
        } 
      }
      console.log('All files processed successfully');
      showNotification('Receipts uploaded successfully', 'success')
    }catch (error){
      console.error('Error in uploadReceiptsToFirebase:', error);
      showNotification(`Error uploading receipts: ${error.message}`, 'error');
      throw error;
    }finally{
      setUploading(false)
      console.log('uploadReceiptsToFirebase completed');
    }
    return uploadedFiles
  }

  useImperativeHandle(ref, () => ({
    uploadReceiptsToFirebase
  }))

  //render previews
  const previews = selectedImages?.map((file,index) =>(
    <div key={file.preview} className="flex flex-col items-center w-full h-[104px] p-3 text-sm text-center text-gray-500 border border-gray-300 border-dashed rounded-md">
      <img src={file.preview} alt={file.name} className="h-12 pb-3 rounded-med"  />
      <p className="pb-1 text-xs text-gray-600"><span className="font-bold">{file.name}</span> attached</p>
      <div className='flex gap-4'>
        <button type="button" className="text-xs text-gray-600" onClick={() => handleFileRemove(index)}>
        Delete attachment
        </button>
        <button className="text-xs text-gray-600">Attach new receipt file</button>
      </div>
      
    </div>
  ))

  // instructions to show when no images/files selected
  const inputSection = ()=> {
    return(
      <div {...getRootProps()} className="w-full h-auto p-2 mt-1 text-center text-gray-500 border border-gray-300 border-dashed rounded-md">
        <input {...getInputProps()}  />
        <p>Upload receipt image or drag and drop</p>
        <p>.png, .jpeg, .heic, .pdf, up to 5MB</p>
        <p>PDF supports only one page</p>        
      </div>
    )
  }


  return (
    <>      
      <p className="flex flex-col mb-4 text-sm">Attachments</p>
      {uploading ? (
        <div className="flex items-center">
          Uploading...
        </div> 
      ) : (
        <div className="flex items-center">
          {selectedImages.length>0 ? previews : inputSection()}
        </div> 
      )}
      
    </>
  )
})

ReceiptManagement.propTypes = {
  expenseId: PropTypes.string.isRequired,
};
ReceiptManagement.displayName = 'ReceiptManagement';

export default ReceiptManagement
