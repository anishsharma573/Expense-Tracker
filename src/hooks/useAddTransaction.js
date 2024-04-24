import { addDoc,collection, serverTimestamp } from "firebase/firestore" 
import { db } from "../config/firebaseConfig"
import getUserInfo from "./useGetUserInfo"
import { useState } from "react"


 const useAddTransactions =()=>{
    const transactionCollectionRef =collection(db,"transactions")
   
  
    const {userID}=getUserInfo();

    const addTransactions =async({
    
        description,
        transactionAmount,
        transactionType,
    })=>{
     await addDoc(transactionCollectionRef,{
        userID,
        description,
        transactionAmount,
        transactionType,
        createdAt:serverTimestamp()

     })
    }
    return{addTransactions}
 }

 export default useAddTransactions