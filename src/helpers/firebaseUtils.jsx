//handles query and fetch using firestore SDK 
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore()

export const fetchReceiptImage = async (expenseId) =>{
    
  try {
    const q = query(collection(db, "receipts"), where("expenseId", "==", expenseId))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty){
      //console.error('No receipt found for this expense')
      return null
    }
    const receiptDoc = querySnapshot.docs[0].data()
    //console.log("Fetched data",receiptDoc)
    const fileUrl = receiptDoc.fileUrl
    return fileUrl
  } catch(error) {
    //console.error('Failed to fetch receipt image:', error)
    return null
  }     
}